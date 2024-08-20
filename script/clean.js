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