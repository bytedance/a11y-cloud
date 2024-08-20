const { selectUse, selectExample, selectPackages, runCommand, runParallel } = require('./utils');

const main = async () => {
  const use = await selectUse();
  if (use === 'example') {
    const examplePath = await selectExample();
    await runCommand(examplePath);
  } else if (use === 'packages') {
    const packages = await selectPackages();
    await runParallel(packages);
  }
};

main();