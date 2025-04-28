import { readdir } from 'fs/promises';
import path from 'path';

export async function getClientScript(prefix: string) {
  const cwd = process.cwd();
  const out = path.join(cwd, 'out', 'gui', 'browser');
  const files = await readdir(out, { withFileTypes: true, encoding: 'utf-8', recursive: true });
  const asset = files.find((f) => f.name.startsWith(prefix) && f.name.endsWith('.js'));

  if (asset) {
    return `gui/browser/${asset.name}`;
  }

  return null;
}
