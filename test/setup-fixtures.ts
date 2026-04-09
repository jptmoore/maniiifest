/**
 * Downloads missing IIIF Cookbook fixtures into test/cookbook/.
 *
 * Run directly:  npx ts-node test/setup-fixtures.ts
 * Runs automatically before tests via the "pretest" npm script.
 */

import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import { fixtures } from './fixtures';

function download(url: string, maxRedirects = 5): Promise<string> {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      return reject(new Error(`Too many redirects for ${url}`));
    }
    const req = https.get(url, { timeout: 30_000 }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, maxRedirects - 1).then(resolve, reject);
      }
      if (res.statusCode && res.statusCode >= 400) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let body = '';
      res.on('data', (chunk: string) => (body += chunk));
      res.on('end', () => resolve(body));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function main() {
  const cookbookDir = path.join(__dirname, 'cookbook');
  if (!fs.existsSync(cookbookDir)) {
    fs.mkdirSync(cookbookDir, { recursive: true });
  }

  const missing = fixtures.filter(
    (f) => !fs.existsSync(path.join(cookbookDir, f.name))
  );

  if (missing.length === 0) {
    console.log('All cookbook fixtures already cached.');
    return;
  }

  console.log(`Downloading ${missing.length} cookbook fixture(s)...`);
  let failed = 0;

  for (const fixture of missing) {
    try {
      let data: string;
      try {
        data = await download(fixture.url);
      } catch {
        // one retry after a short pause
        await new Promise((r) => setTimeout(r, 1_000));
        data = await download(fixture.url);
      }
      JSON.parse(data); // validate JSON before writing
      fs.writeFileSync(path.join(cookbookDir, fixture.name), data, 'utf-8');
      console.log(`  ✓ ${fixture.name}`);
    } catch (err: any) {
      console.error(`  ✗ ${fixture.name}: ${err.message}`);
      failed++;
    }
  }

  if (failed > 0) {
    console.warn(`\n${failed} fixture(s) failed to download. Related tests will be skipped.`);
  }
}

main();
