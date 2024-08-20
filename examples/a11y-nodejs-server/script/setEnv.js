const fs = require('fs');
const path = require('path');

// 如果没有设置环境变量，则按照用户的输入进行设置
// if process.env.NODE_ENV not set, then set it by user input
const checkENV = () => {
  const env = process.env.NODE_ENV;
  if (env) {
    return;
  }

  const userSetEnvDev = process.argv.indexOf('--dev') !== -1;
  fs.writeFileSync(
    path.resolve(__dirname, '../.env'),
    `NODE_ENV=${userSetEnvDev ? 'development' : 'production'}`,
  );
};

checkENV();
