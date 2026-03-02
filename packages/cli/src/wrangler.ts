import which from 'which';
import { exec, execInteractive } from './utils.js';

/**
 * Checks if wrangler CLI is installed globally.
 */
export async function isWranglerInstalled(): Promise<boolean> {
  try {
    await which('wrangler');
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a message contains permission-related errors.
 */
function isPermissionError(message: string): boolean {
  const lower = message.toLowerCase();
  return lower.includes('eacces') || lower.includes('eperm') ||
    lower.includes('permission denied') || lower.includes('operation not permitted');
}

/**
 * Returns a platform-appropriate permission error hint.
 */
function getPermissionHint(): string {
  if (process.platform === 'win32') {
    return 'Permission denied. Try:\n  Run your terminal as Administrator and retry\n\nOr use npx wrangler instead (no install needed).';
  }
  return 'Permission denied. Try:\n  sudo npm install -g wrangler\n\nOr use npx wrangler instead (no install needed).';
}

/**
 * Installs wrangler globally via npm.
 * Returns true on success, false on failure.
 */
export async function installWrangler(): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await exec('npm', ['install', '-g', 'wrangler']);

    // exec resolves even on non-zero exit codes — check explicitly
    if (result.code !== 0) {
      const message = result.stderr || result.stdout || 'Install failed';
      if (isPermissionError(message)) {
        return { success: false, error: getPermissionHint() };
      }
      return { success: false, error: message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (isPermissionError(message)) {
      return { success: false, error: getPermissionHint() };
    }
    return { success: false, error: message };
  }
}

/**
 * Checks if the user is authenticated with Cloudflare.
 * Returns true if `wrangler whoami` succeeds.
 */
export async function isWranglerAuthenticated(): Promise<boolean> {
  try {
    const result = await exec('wrangler', ['whoami']);
    if (result.code !== 0) return false;
    // wrangler whoami returns 0 even when not logged in, but shows "not authenticated"
    return !result.stdout.toLowerCase().includes('not authenticated');
  } catch {
    return false;
  }
}

/**
 * Runs `wrangler login` interactively (opens browser for OAuth).
 * Returns true on success.
 */
export async function loginWrangler(): Promise<boolean> {
  try {
    await execInteractive('wrangler', ['login']);
    // Verify auth worked
    return await isWranglerAuthenticated();
  } catch {
    return false;
  }
}

/**
 * Deploys the worker project using `wrangler deploy`.
 * Runs inside the project directory.
 * Returns the deployed URL on success.
 */
export async function deployWorker(
  projectDir: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const result = await exec('wrangler', ['deploy'], { cwd: projectDir });
    const output = result.stdout + result.stderr;

    if (result.code !== 0) {
      return { success: false, error: output || 'Deploy failed' };
    }

    // Extract deployed URL from wrangler output
    const urlMatch = output.match(/https:\/\/[^\s]+\.workers\.dev/);
    const url = urlMatch ? urlMatch[0] : undefined;

    return { success: true, url };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}

/**
 * Installs npm dependencies in the project directory.
 */
export async function installDependencies(projectDir: string): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await exec('npm', ['install'], { cwd: projectDir });

    if (result.code !== 0) {
      return { success: false, error: result.stderr || result.stdout || 'Install failed' };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
