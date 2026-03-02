import * as clack from '@clack/prompts';
import pc from 'picocolors';
import path from 'node:path';
import { normalizeSupabaseUrl, validateSupabaseUrl, validateWorkerName, validateOrigins } from './validation.js';

/** Block writing to system-critical directories (uses env vars for Windows portability) */
const DANGEROUS_PREFIXES = [
  // Unix
  '/etc', '/usr', '/bin', '/sbin', '/var', '/boot', '/root', '/sys', '/proc', '/dev',
  // Windows (dynamic — works on any drive letter)
  ...(process.platform === 'win32' ? [
    process.env.SystemRoot || 'C:\\Windows',
    process.env.ProgramFiles || 'C:\\Program Files',
    process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)',
  ] : []),
];

type SupabaseService = 'rest' | 'auth' | 'storage' | 'realtime' | 'functions' | 'graphql';

export interface UserAnswers {
  supabaseUrl: string;
  allowedOrigins: string;
  enabledServices: SupabaseService[];
  workerName: string;
  projectDir: string;
}

/**
 * Handles Ctrl+C cancellation from any prompt.
 */
function handleCancel(value: unknown): void {
  if (clack.isCancel(value)) {
    clack.cancel('Setup cancelled.');
    process.exit(0);
  }
}

/**
 * Runs the full interactive prompt flow.
 * Returns validated user answers.
 */
export async function runPrompts(): Promise<UserAnswers> {
  // 1. Supabase project URL
  clack.log.info(
    pc.bold('Step 1 of 5') + pc.gray(' — Your Supabase project URL\n') +
    pc.gray('  Find it in: Supabase Dashboard → Settings → API → Project URL\n') +
    pc.gray('  It looks like: ') + pc.cyan('https://abcdefgh.supabase.co')
  );

  const supabaseUrlRaw = await clack.text({
    message: 'Supabase project URL',
    placeholder: 'abcdefgh.supabase.co',
    validate(value) {
      return validateSupabaseUrl(value);
    },
  });
  handleCancel(supabaseUrlRaw);
  const supabaseUrl = normalizeSupabaseUrl(supabaseUrlRaw as string);

  // 2. CORS allowed origins
  clack.log.info(
    pc.bold('Step 2 of 5') + pc.gray(' — CORS allowed origins\n') +
    pc.gray('  Which domains can access your proxy?\n') +
    pc.gray('  • Use ') + pc.white('*') + pc.gray(' to allow all origins (easiest for development)\n') +
    pc.gray('  • Or list your domains: ') + pc.cyan('https://myapp.com, https://staging.myapp.com')
  );

  const originsRaw = await clack.text({
    message: 'Allowed origins',
    placeholder: '*',
    initialValue: '*',
    validate(value) {
      return validateOrigins(value);
    },
  });
  handleCancel(originsRaw);
  const allowedOrigins = (originsRaw as string).trim();

  // 3. Which services to enable
  clack.log.info(
    pc.bold('Step 3 of 5') + pc.gray(' — Supabase services to proxy\n') +
    pc.gray('  Select which Supabase services your app uses.\n') +
    pc.gray('  Use ') + pc.white('space') + pc.gray(' to toggle, ') + pc.white('enter') + pc.gray(' to confirm.')
  );

  const servicesRaw = await clack.multiselect({
    message: 'Enable services',
    options: [
      { value: 'rest', label: 'REST API', hint: '/rest/ — PostgREST queries & CRUD' },
      { value: 'auth', label: 'Auth', hint: '/auth/ — Login, signup, OAuth, sessions' },
      { value: 'storage', label: 'Storage', hint: '/storage/ — File uploads & downloads' },
      { value: 'realtime', label: 'Realtime', hint: '/realtime/ — WebSocket subscriptions' },
      { value: 'functions', label: 'Edge Functions', hint: '/functions/ — Serverless functions' },
      { value: 'graphql', label: 'GraphQL', hint: '/graphql/ — pg_graphql endpoint' },
    ],
    initialValues: ['rest', 'auth', 'storage', 'realtime', 'functions', 'graphql'],
    required: true,
  });
  handleCancel(servicesRaw);
  const enabledServices = servicesRaw as SupabaseService[];

  // 4. Worker name
  clack.log.info(
    pc.bold('Step 4 of 5') + pc.gray(' — Cloudflare Worker name\n') +
    pc.gray('  This becomes your proxy URL: ') + pc.cyan('https://<name>.<you>.workers.dev\n') +
    pc.gray('  Lowercase letters, numbers, and hyphens only.')
  );

  const workerNameRaw = await clack.text({
    message: 'Worker name',
    placeholder: 'supabase-proxy',
    initialValue: 'supabase-proxy',
    validate(value) {
      return validateWorkerName(value);
    },
  });
  handleCancel(workerNameRaw);
  const workerName = (workerNameRaw as string).trim();

  // 5. Project directory
  clack.log.info(
    pc.bold('Step 5 of 5') + pc.gray(' — Where to create the project')
  );

  const projectDirRaw = await clack.text({
    message: 'Project directory',
    placeholder: `./${workerName}`,
    initialValue: `./${workerName}`,
    validate(value) {
      const resolved = path.resolve(value.trim());
      const lower = resolved.toLowerCase();
      for (const prefix of DANGEROUS_PREFIXES) {
        if (lower.startsWith(prefix.toLowerCase())) {
          return `Cannot write to system directory: ${prefix}`;
        }
      }
      return undefined;
    },
  });
  handleCancel(projectDirRaw);
  const projectDir = (projectDirRaw as string).trim();

  return {
    supabaseUrl,
    allowedOrigins,
    enabledServices,
    workerName,
    projectDir,
  };
}

/**
 * Shows the welcome banner with context about what this tool does.
 */
export function showBanner(): void {
  console.log();
  console.log(pc.bold(pc.cyan('  ╭─────────────────────────────────────────────────╮')));
  console.log(pc.bold(pc.cyan('  │                                                 │')));
  console.log(pc.bold(pc.cyan('  │') + '   🚀 ' + pc.white('create-jiobase') + '                           ' + pc.cyan('│')));
  console.log(pc.bold(pc.cyan('  │') + pc.gray('   Self-host a Supabase reverse proxy') + '            ' + pc.cyan('│')));
  console.log(pc.bold(pc.cyan('  │') + pc.gray('   on Cloudflare Workers (free tier)') + '             ' + pc.cyan('│')));
  console.log(pc.bold(pc.cyan('  │                                                 │')));
  console.log(pc.bold(pc.cyan('  ╰─────────────────────────────────────────────────╯')));
  console.log();
  console.log(pc.gray('  Bypasses ISP-level DNS blocking of *.supabase.co'));
  console.log(pc.gray('  by routing traffic through Cloudflare\'s edge network.'));
  console.log();
  console.log(pc.gray('  How it works:'));
  console.log(pc.gray('  1. You provide your Supabase project URL'));
  console.log(pc.gray('  2. We generate a Cloudflare Worker proxy'));
  console.log(pc.gray('  3. Deploy it to Cloudflare (free plan works!)'));
  console.log(pc.gray('  4. Update your app to use the proxy URL'));
  console.log();
  console.log(pc.gray('  Docs: ') + pc.cyan('https://jiobase.com'));
  console.log(pc.gray('  GitHub: ') + pc.cyan('https://github.com/sunithvs/jiobase'));
  console.log();
}

/**
 * Confirms directory overwrite if non-empty.
 */
export async function confirmOverwrite(dir: string): Promise<boolean> {
  const result = await clack.confirm({
    message: `Directory ${pc.yellow(dir)} already exists and is not empty. Overwrite?`,
    initialValue: false,
  });
  handleCancel(result);
  return result as boolean;
}

/**
 * Asks user if they want to install wrangler.
 */
export async function confirmWranglerInstall(): Promise<boolean> {
  const result = await clack.confirm({
    message: `Wrangler CLI not found. Install it globally? ${pc.gray('(npm install -g wrangler)')}`,
    initialValue: true,
  });
  handleCancel(result);
  return result as boolean;
}

/**
 * Asks user if they want to deploy now.
 */
export async function confirmDeploy(): Promise<boolean> {
  const result = await clack.confirm({
    message: `Deploy to Cloudflare now? ${pc.gray('(you can always do this later with: npx wrangler deploy)')}`,
    initialValue: true,
  });
  handleCancel(result);
  return result as boolean;
}
