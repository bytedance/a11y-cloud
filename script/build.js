const { selectUse, selectExample, selectPackages, runCommand, runParallel } = require('./utils');

const main = async () => {
  const use = await selectUse();
  if (use === 'example') {
    const examplePath = await selectExample('build');
    await runCommand(examplePath, 'build');
  } else if (use === 'packages') {
    const packages = await selectPackages('build');
    await runParallel(packages, 'build');
  }
};

main();