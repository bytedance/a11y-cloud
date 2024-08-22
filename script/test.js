/*
Copyright (2024) Bytedance Ltd. and/or its affiliates
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const path = require('path');
const { spawnSync } = require('child_process');
const { findPackageJsonFiles } = require('./utils');

function main() {
  const packageJsonFiles = findPackageJsonFiles(process.cwd());
  const testPackageJsonFiles = packageJsonFiles.filter((file) => {
    if (file === path.resolve(__dirname, '../package.json')) {
      return false;
    }
    const packageJson = require(file);
    return packageJson?.scripts?.test;
  });
  testPackageJsonFiles.forEach((file) => {
    const [cwd] = file.split('/package.json');
    spawnSync('yarn', ['test'], {
      stdio: 'inherit',
      cwd,
    });
  });
}

main();
