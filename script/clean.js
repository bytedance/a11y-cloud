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
const fs = require('fs');
const path = require('path');

function deleteDirs(dirPath, pattern = 'node_modules') {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file === pattern) {
        console.log(`Deleting directory: ${filePath}`);
        fs.rmSync(filePath, { recursive: true });
      } else {
        deleteDirs(filePath);
      }
    }
  });
}

deleteDirs(process.cwd(), 'node_modules');
deleteDirs(process.cwd(), 'dist');
