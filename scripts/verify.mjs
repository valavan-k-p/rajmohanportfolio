#!/usr/bin/env node
/**
 * Phase checkpoint (spec §40): typecheck -> lint -> tests -> production build.
 *
 * The build is directed at a throwaway dist dir via BUILD_DIR so it never
 * overwrites the chunks a running `next dev` has already loaded.
 */
import { spawnSync } from 'node:child_process';
import { rmSync } from 'node:fs';

const BUILD_DIR = '.next-verify';
const steps = [
  ['typecheck', 'npx', ['tsc', '--noEmit']],
  ['lint', 'npx', ['eslint', '.']],
  ['test', 'npx', ['vitest', 'run']],
  ['build', 'npx', ['next', 'build'], { BUILD_DIR }],
];

let failed = 0;
for (const [name, cmd, args, env] of steps) {
  process.stdout.write(`\n── ${name} ──\n`);
  const r = spawnSync(cmd, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env, ...(env ?? {}) },
  });
  if (r.status !== 0) {
    console.error(`\n✗ ${name} FAILED (exit ${r.status})`);
    failed += 1;
  }
}

rmSync(BUILD_DIR, { recursive: true, force: true });
console.log(failed === 0 ? '\n✓ all checkpoint gates passed' : `\n✗ ${failed} gate(s) failed`);
process.exit(failed === 0 ? 0 : 1);
