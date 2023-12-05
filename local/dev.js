// eslint-disable-next-line prefer-destructuring
const execSync = require('child_process').execSync;
const spaw = require('child_process').spawn;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

(async () => {
  fs.writeFileSync('/tmp/ready', 'pending');
  const rootFolder = path.resolve(__dirname, '..');
  const lockFile = path.join(rootFolder, 'yarn.lock');

  console.log('yarn.lock file path: ', lockFile);

  const ensureDepdenencies = async () => {
    const fileBuffer = fs.readFileSync(lockFile);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);

    const newHash = hashSum.digest('hex');
    const hashFile = lockFile.replace('lock', 'checksum');
    let currentHash = '';
    let reInstall = true;
    if (fs.existsSync(hashFile)) {
      currentHash = fs.readFileSync(hashFile, 'utf8');
      if (currentHash === newHash) {
        console.log('no need to install dependencies');
        reInstall = false;
      }
    }
    if (reInstall) {
      console.log(
        'yarn.lock checksum has changed(checksum: %s => %s, run yarn to update dependencies',
        currentHash,
        newHash,
      );
      fs.writeFileSync(hashFile, newHash);
      await execSync(`yarn || true`, {
        stdio: 'inherit',
        shell: true,
        cwd: rootFolder,
      });
    }
  };

  await ensureDepdenencies();

  console.log('Setup yarn.lock watching', lockFile);
  fs.watchFile(lockFile, () => {
    console.log('yarn.lock changed, run yarn to update dependencies');
    ensureDepdenencies().catch(console.error);
  });

  fs.writeFileSync('/tmp/ready', 'ready');

  await execSync(`yarn build-common-pkg`, {
    stdio: 'inherit',
    shell: true,
    cwd: rootFolder,
  });

  await execSync(`yarn build-ui-libs`, {
    stdio: 'inherit',
    shell: true,
    cwd: rootFolder,
  });

  const commonScopes = [
    '@tymlez/common-libs',
    '@tymlez/platform-api-interfaces',
    '@tymlez/backend-libs',
    '@tymlez/frontend-libs',
    '@tymlez/trustchain-sdk',
    '@tymlez/devias-material-kit',
    '@tymlez/guardian-api-client',
  ]
    .map((x) => `--scope ${x}`)
    .join(' ');

  await new Promise((resolve) => {
    console.log('Watching custom dependency changes...');
    const child = spaw('yarn', ['watch:dev', commonScopes], {
      shell: true,
    });

    child.stdout.on('data', (d) => console.log(d.toString()));
    child.stderr.on('data', (d) => console.error(d.toString()));

    child.on('close', (code) => {
      resolve(code);
    });
  });
})();
