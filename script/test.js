const path = require('path');
const { spawnSync } = require('child_process');
const { findPackageJsonFiles } = require('./utils');

function main() {
  const packageJsonFiles = findPackageJsonFiles(process.cwd());
  const testPackageJsonFiles = packageJsonFiles.filter(file => {
    if (file === path.resolve(__dirname, '../package.json')) {
      return false;
    }
    const packageJson = require(file);
    return packageJson?.scripts?.test;
  });
  testPackageJsonFiles.forEach(file => {
    const [cwd] = file.split('/package.json');
    spawnSync('yarn', ['test'], {
      stdio: 'inherit',
      cwd,
    });
  });
}

main();