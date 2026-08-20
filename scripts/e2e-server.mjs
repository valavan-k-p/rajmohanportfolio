#!/usr/bin/env node
/**
 * Builds and starts the app for Playwright.
 *
 * Uses its own BUILD_DIR and port so an E2E run never clobbers a developer's
 * running `next dev` — the same collision that produced the
 * "Cannot find module './NNN.js'" failure earlier in this project.
 *
 * Cross-platform: env vars are set on the child process rather than with shell
 * syntax, which differs between bash and PowerShell.
 */
import { spawn, spawnSync } from 'node:child_process';

const PORT = process.env.E2E_PORT ?? '3100';
const BUILD_DIR = '.next-e2e';
// The suite covers the PUBLIC surface, which must render without a backend.
// This opt-out lets a production build boot unconfigured; it is scoped to this
// script and logs a warning on every boot.
const env = {
  ...process.env,
  BUILD_DIR,
  PORT,
  ALLOW_UNCONFIGURED_PRODUCTION_BOOT: 'e2e-public-surface-only',
};
const shell = process.platform === 'win32';

const build = spawnSync('npx', ['next', 'build'], { stdio: 'inherit', shell, env });
if (build.status !== 0) process.exit(build.status ?? 1);

const server = spawn('npx', ['next', 'start', '--port', PORT], {
  stdio: 'inherit',
  shell,
  env,
});

const shutdown = () => server.kill();
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
server.on('exit', (code) => process.exit(code ?? 0));
