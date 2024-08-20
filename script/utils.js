const fs = require('fs');
const path = require('path');
const { spawnSync, spawn } = require('child_process');

const inquirer = require('inquirer');
inquirer.registerPrompt(
  'checkbox-plus',
  require('inquirer-checkbox-plus-prompt'),
);

// get last choose
const getLast = (type = 'example', mode = 'start', defaultChoose = []) => {
  const ifLastExit = fs.existsSync(path.resolve(__dirname, './.last_choose'));
  if (ifLastExit) {
    try {
      const last = fs.readFileSync(path.resolve(__dirname, './.last_choose'), {
        encoding: 'utf-8',
      });
      const lastChoose = JSON.parse(last);
      return lastChoose?.[mode]?.[type] || defaultChoose;
    } catch (err) {
      return defaultChoose;
    }
  }
  return defaultChoose;
};

// set last choose
const setLast = (type = 'example', mode = 'start', newVal) => {
  const ifLastExit = fs.existsSync(path.resolve(__dirname, './.last_choose'));
  if (!ifLastExit) {
    fs.writeFileSync(
      path.resolve(__dirname, './.last_choose'),
      JSON.stringify(
        {
          [mode]: {
            [type]: newVal,
          },
        },
        null,
        2,
      ),
    );
  }

  try {
    const last = fs.readFileSync(path.resolve(__dirname, './.last_choose'), {
      encoding: 'utf-8',
    });
    const lastChoose = JSON.parse(last);
    if (!lastChoose?.[mode]) {
      lastChoose[mode] = {};
    }
    lastChoose[mode][type] = newVal;
    fs.writeFileSync(
      path.resolve(__dirname, './.last_choose'),
      JSON.stringify(lastChoose, null, 2),
    );
  } catch (err) {
    console.error(`Parse cache file failed: ${err}`);
  }
};

// choose use: example or packages
const selectUse = async () => {
  const { use } = await inquirer.prompt([
    {
      name: 'use',
      type: 'list',
      message: 'Please choose usage:',
      choices: [
        {
          name: 'Run example',
          value: 'example',
        },
        {
          name: 'Run packages',
          value: 'packages',
        },
      ],
    },
  ]);

  return use;
};

// select example to run
const selectExample = async (command = 'start') => {
  const examplePath = path.resolve(__dirname, '../examples');
  try {
    const files = fs.readdirSync(examplePath);
    const directories = files.filter((file) => {
      const filePath = path.join(examplePath, file);
      return fs.statSync(filePath).isDirectory();
    });

    // for more examples，run only one at one time
    if (directories.length > 1) {
      const { exampleDirName } = await inquirer.prompt([
        {
          name: 'exampleDirName',
          type: 'list',
          message: 'Please choose examples:',
          default: getLast('example', command)[0],
          choices: directories.map((dirName) => ({
            name: dirName,
            value: dirName,
          })),
        },
      ]);
      setLast('packages', command, [exampleDirName]);
      return path.resolve(examplePath, exampleDirName);
    } else {
      return path.resolve(examplePath, directories[0]);
    }
  } catch (err) {
    console.error(`Read dirs in ${examplePath} failed:`, err);
  }
};

// select packages to run
const selectPackages = async (command = 'start') => {
  const packagesPath = path.resolve(__dirname, '../packages');
  try {
    const files = fs.readdirSync(packagesPath);
    const directories = files.filter((file) => {
      const filePath = path.join(packagesPath, file);
      return fs.statSync(filePath).isDirectory();
    });
    const choices = directories.map((value) => ({
      name: value,
      value,
    }));

    const { packages } = await inquirer.prompt([
      {
        name: 'packages',
        type: 'checkbox-plus',
        message:
          'Please select the corresponding debug packages (multiple selections allowed, use space to select, supports fuzzy search):',
        pageSize: 20,
        highlight: true,
        searchable: true,
        default: getLast('packages', command, [
          'a11y-web-client',
          'a11y-web-sdk',
          'a11y-web-socket',
        ]),
        validate: (res) =>
          res && res.length > 0 ? true : 'Choose at least one package',
        // eslint-disable-next-line
        source: async (_answersSoFar, input) => {
          const c = choices.filter((p) =>
            input ? p.name.search(input) > -1 : true,
          );
          return c;
        },
      },
    ]);
    setLast('packages', command, packages);

    return packages.map((packageName) =>
      path.resolve(packagesPath, packageName),
    );
  } catch (err) {
    console.error(`Read dirs in ${packagesPath} failed:`, err);
  }
};

// run command in cwd
const runCommand = async (cwd = __dirname, command = 'start') => {
  spawnSync('yarn', [command], {
    stdio: 'inherit',
    cwd,
  });
};

// run parallel command in one cwd
const runParallel = async (packages = [], command = 'start') => {
  const spawnTask = (fn) => {
    const child = fn;
    child.stdout?.on('data', (data) => {
      console.log(data);
    });
    child.stderr?.on('data', (data) => {
      console.error(data);
    });
    child.on('close', (code) => {
      // console.log(`Process exited with code ${code}`);
    });
  };

  packages.forEach((packagePath) => {
    spawnTask(
      spawn('yarn', [command], {
        stdio: 'inherit',
        cwd: packagePath,
      }),
    );
  });
};

const ignorePatterns = ['node_modules', '.vscode'];

// find package.json files in directory
function findPackageJsonFiles(directory, pattern = 'package.json') {
  const packageJsonFiles = [];

  function traverseDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      if (!ignorePatterns.includes(file)) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          traverseDirectory(filePath);
        } else if (file.includes(pattern)) {
          packageJsonFiles.push(filePath);
        }
      }
    });
  }

  traverseDirectory(directory);

  return packageJsonFiles;
}

module.exports = {
  runCommand,
  runParallel,
  selectExample,
  selectPackages,
  selectUse,
  findPackageJsonFiles,
};
