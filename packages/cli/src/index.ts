#!/usr/bin/env node

import * as clack from '@clack/prompts';
import pc from 'picocolors';
import path from 'node:path';
import {
  showBanner,
  runPrompts,
  confirmOverwrite,
  confirmWranglerInstall,
  confirmDeploy,
} from './prompts.js';
import { scaffoldProject, isDirectoryNonEmpty } from './scaffold.js';
import {
  isWranglerInstalled,
  installWrangler,
  isWranglerAuthenticated,
  loginWrangler,
  deployWorker,
  installDependencies,
} from './wrangler.js';

// --- Node.js version check ---
const NODE_MAJOR = parseInt(process.versions.node.split('.')[0], 10);
if (NODE_MAJOR < 18) {
  console.error(
    pc.red(`\n  Node.js 18+ is required. You have v${process.versions.node}.\n`) +
    pc.gray('  Update with: fnm install 18\n') +
    pc.gray('  Or download from: https://nodejs.org\n')
  );
  process.exit(1);
}

async function main() {
  showBanner();

  clack.intro(pc.inverse(' create-jiobase '));

  // --- Interactive prompts ---
  const answers = await runPrompts();

  const projectDir = path.resolve(answers.projectDir);

  // --- Check directory ---
  if (isDirectoryNonEmpty(projectDir)) {
    const overwrite = await confirmOverwrite(projectDir);
    if (!overwrite) {
      clack.cancel('Setup cancelled. Choose a different directory.');
      process.exit(0);
    }
  }

  // --- Check wrangler ---
  const wranglerSpinner = clack.spinner();

  let hasWrangler = await isWranglerInstalled();

  if (!hasWrangler) {
    const shouldInstall = await confirmWranglerInstall();

    if (!shouldInstall) {
      clack.log.warn(
        'Wrangler is required to deploy. You can install it later:\n' +
        pc.gray('  npm install -g wrangler\n') +
        pc.gray('  # or use: npx wrangler deploy')
      );
      // Continue with scaffold only, skip deploy
    } else {
      wranglerSpinner.start('Installing wrangler...');
      const installResult = await installWrangler();

      if (!installResult.success) {
        wranglerSpinner.stop('Failed to install wrangler');
        clack.log.error(installResult.error || 'Unknown error');
        clack.log.info(
          'Try installing manually:\n' +
          pc.gray('  sudo npm install -g wrangler') + '\n' +
          pc.gray('  # or use npx wrangler (no install needed)')
        );
      } else {
        wranglerSpinner.stop('Wrangler installed');
        hasWrangler = true;
      }
    }
  }

  // --- Check wrangler auth ---
  let isAuthed = false;

  if (hasWrangler) {
    wranglerSpinner.start('Checking Cloudflare authentication...');
    isAuthed = await isWranglerAuthenticated();
    wranglerSpinner.stop(isAuthed ? 'Authenticated with Cloudflare' : 'Not authenticated');

    if (!isAuthed) {
      clack.log.info(
        'You need to log in to Cloudflare to deploy.\n' +
        pc.gray('  This will open your browser for authentication.')
      );

      clack.log.step('Opening Cloudflare login...');
      isAuthed = await loginWrangler();

      if (!isAuthed) {
        clack.log.warn(
          'Authentication failed. You can try again later:\n' +
          pc.gray('  wrangler login\n\n') +
          "Don't have a Cloudflare account?\n" +
          pc.cyan('  https://dash.cloudflare.com/sign-up') + ' (free)'
        );
      }
    }
  }

  // --- Scaffold project ---
  const scaffoldSpinner = clack.spinner();
  scaffoldSpinner.start('Scaffolding project...');

  try {
    scaffoldProject({
      projectDir,
      workerName: answers.workerName,
      config: {
        supabaseUrl: answers.supabaseUrl,
        allowedOrigins: answers.allowedOrigins,
        enabledServices: answers.enabledServices,
      },
    });
    scaffoldSpinner.stop('Project scaffolded');
  } catch (err) {
    scaffoldSpinner.stop('Failed to scaffold project');
    clack.log.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }

  // --- Show generated files ---
  clack.log.info(
    `${pc.bold('Generated files:')}\n` +
    pc.gray(`  ${answers.projectDir}/\n`) +
    pc.gray('  ├── src/index.ts      # Supabase proxy worker\n') +
    pc.gray('  ├── wrangler.toml     # Cloudflare config\n') +
    pc.gray('  ├── package.json\n') +
    pc.gray('  ├── tsconfig.json\n') +
    pc.gray('  └── .gitignore')
  );

  // --- Deploy ---
  if (hasWrangler && isAuthed) {
    const shouldDeploy = await confirmDeploy();

    if (shouldDeploy) {
      // Install deps first
      const depsSpinner = clack.spinner();
      depsSpinner.start('Installing dependencies...');
      const depsResult = await installDependencies(projectDir);

      if (!depsResult.success) {
        depsSpinner.stop('Failed to install dependencies');
        clack.log.error(depsResult.error || 'Unknown error');
        clack.log.info(
          'Try manually:\n' +
          pc.gray(`  cd ${answers.projectDir}\n`) +
          pc.gray('  npm install\n') +
          pc.gray('  npx wrangler deploy')
        );
      } else {
        depsSpinner.stop('Dependencies installed');

        // Deploy
        const deploySpinner = clack.spinner();
        deploySpinner.start('Deploying to Cloudflare...');
        const deployResult = await deployWorker(projectDir);

        if (deployResult.success) {
          deploySpinner.stop('Deployed successfully!');

          if (deployResult.url) {
            console.log();
            console.log(pc.bold(pc.green('  ✓ Your proxy is live!')));
            console.log();
            console.log(pc.bold(`  URL: ${pc.cyan(deployResult.url)}`));
            console.log();
            console.log(pc.gray('  Test it:'));
            console.log(pc.gray(`  curl ${deployResult.url}/__health`));
            console.log();
          }
        } else {
          deploySpinner.stop('Deploy failed');
          clack.log.error(deployResult.error || 'Unknown error');
          clack.log.info(
            'You can try deploying manually:\n' +
            pc.gray(`  cd ${answers.projectDir}\n`) +
            pc.gray('  npx wrangler deploy')
          );
        }
      }
    }
  } else if (!hasWrangler || !isAuthed) {
    // Show manual deploy instructions
    console.log();
    clack.log.step(
      pc.bold('To deploy later:\n') +
      pc.gray(`  cd ${answers.projectDir}\n`) +
      pc.gray('  npm install\n') +
      pc.gray('  npx wrangler login   # if not logged in\n') +
      pc.gray('  npx wrangler deploy')
    );
  }

  // --- Success ---
  console.log();
  clack.log.step(pc.bold('How to use the proxy in your app:'));
  console.log();
  console.log(pc.gray('  Replace your Supabase client URL:'));
  console.log();
  console.log(pc.gray('  ') + pc.red('// Before (blocked by ISP)'));
  console.log(pc.gray('  ') + pc.white(`const supabase = createClient('${answers.supabaseUrl}', 'your-anon-key')`));
  console.log();
  console.log(pc.gray('  ') + pc.green('// After (works everywhere)'));
  console.log(pc.gray('  ') + pc.white(`const supabase = createClient('https://${answers.workerName}.<you>.workers.dev', 'your-anon-key')`));
  console.log();

  clack.log.info(
    pc.bold('Useful commands:\n') +
    pc.gray(`  ${pc.white(`cd ${answers.projectDir} && npm run dev`)}   → Local testing\n`) +
    pc.gray(`  ${pc.white(`cd ${answers.projectDir} && npm run deploy`)} → Re-deploy changes\n`) +
    pc.gray(`  ${pc.white('npx wrangler tail')}                    → View live logs`)
  );

  clack.outro(pc.green('Done! Your Supabase proxy is ready 🎉'));
}

main().catch((err) => {
  console.error(pc.red('\nUnexpected error:'), err);
  process.exit(1);
});
