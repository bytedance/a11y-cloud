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
const Koa = require('koa');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const chalk = require('chalk');
const open = require('open');
const mockData = require('./mockData.js');
const {
  serverPort,
  sdkDevPort,
  markToolDevPort,
} = require('../../../config/deployment.config');

require('dotenv').config();
const isProductionMode = process.env.NODE_ENV === 'production';

const webConfig = {
  htmlDist: path.join(__dirname, '../../../packages/a11y-web-client/dist'),
  sdkDist: path.join(__dirname, '../../../packages/a11y-web-sdk/dist'),
};

const cros = (ctx, path = '*') => {
  ctx.set('Access-Control-Allow-Origin', path);
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
  );
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Credentials', 'true');
};

let app;
let server;
const startServer = () => {
  app = new Koa();
  const router = new Router();

  router.get('/', (ctx) => {
    ctx.type = 'text/html';
    const template = fs.readFileSync(
      `${webConfig.htmlDist}/index.html`,
      'utf-8',
    );
    ctx.body = template;
  });

  router.get('/get_a11y_data', async (ctx) => {
    cros(ctx, ctx.request.header.origin);
    const { product_id } = ctx.query;
    const filePath = path.join(__dirname, `../_a11y_DATA/${product_id}.json`);
    try {
      const data = await fs.promises.readFile(filePath, 'utf8');
      ctx.body = JSON.parse(data);
    } catch (err) {
      const initData = {
        data: [
          {
            route: '*',
            data: [],
            _id: uuidv4(),
          },
        ],
      };
      await fs.promises.writeFile(
        filePath,
        JSON.stringify(initData, null, '\t'),
      );
      ctx.body = initData;
    }
  });

  router.options('/submit_label_mark', async (ctx) => {
    cros(ctx, ctx.request.header.origin);
    ctx.body = 200;
  });

  router.post('/submit_label_mark', async (ctx) => {
    cros(ctx, ctx.request.header.origin);
    const { product_id, page_id, type, label } = ctx.request.body;
    const filePath = path.join(__dirname, `../_a11y_DATA/${product_id}.json`);
    const dataString = await fs.promises.readFile(filePath, 'utf8');
    const a11yData = JSON.parse(dataString);
    const { data } = a11yData;
    for (const page of data) {
      if (page._id === page_id) {
        if (type === 'update' || type === 'delete') {
          for (let i = 0; i < page.data.length; i++) {
            if (page.data[i]._id === label._id) {
              if (type === 'update') {
                page.data.splice(i, 1, label);
              } else {
                page.data.splice(i, 1);
              }
              break;
            }
          }
        } else if (type === 'add') {
          label._id = uuidv4();
          page.data.unshift(label);
        }
        break;
      }
    }
    await fs.promises.writeFile(filePath, JSON.stringify(a11yData, null, '\t'));
    ctx.body = {
      data: {
        label,
      },
      message: '',
      statusCode: 0,
    };
  });

  router.options('/submit_page_mark', async (ctx) => {
    cros(ctx, ctx.request.header.origin);
    ctx.body = 200;
  });

  router.post('/submit_page_mark', async (ctx) => {
    cros(ctx, ctx.request.header.origin);
    const { product_id, type, page } = ctx.request.body;
    const filePath = path.join(__dirname, `../_a11y_DATA/${product_id}.json`);
    const dataString = await fs.promises.readFile(filePath, 'utf8');
    const a11yData = JSON.parse(dataString);
    const { data } = a11yData;
    let resPage = page;
    if (type === 'add') {
      resPage = {
        ...page,
        _id: uuidv4(),
      };
      data.push(resPage);
    } else if (type === 'update') {
      for (const cpage of data) {
        if (cpage._id === page._id) {
          cpage.desc = page.desc;
          cpage.route = page.route;
          resPage = cpage;
          break;
        }
      }
    } else if (type === 'delete') {
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id === page._id) {
          data.splice(i, 1);
          break;
        }
      }
    }
    await fs.promises.writeFile(filePath, JSON.stringify(a11yData, null, '\t'));
    ctx.body = {
      data: {
        page: {
          desc: resPage.desc,
          route: resPage.route,
          _id: resPage._id,
        },
      },
      message: '',
      statusCode: 0,
    };
  });

  app.use(bodyParser());
  app.use(router.routes());

  app.use(
    koaStatic(webConfig.sdkDist, {
      hidden: true,
    }),
  );
  app.use(
    koaStatic(webConfig.htmlDist, {
      hidden: true,
    }),
  );

  server = app.listen(serverPort, () => {
    if (!isProductionMode) {
      console.log(
        chalk.yellow('[DEV] A11y mark platform'),
        chalk.underline(`http://localhost:${markToolDevPort}`),
      );
      console.log(
        chalk.yellow('[DEV] A11y sdk'),
        chalk.underline(`http://localhost:${sdkDevPort}/sdk.js`),
      );
      open(`http://localhost:${markToolDevPort}`);
    } else {
      console.log(
        chalk.green('A11y mark platform'),
        chalk.underline(`http://localhost:${serverPort}/index.html`),
      );
      console.log(
        chalk.green('A11y sdk'),
        chalk.underline(`http://localhost:${serverPort}/sdk.min.js`),
      );
      open(`http://localhost:${serverPort}/index.html`);
    }
  });
};

const main = () => {
  const initA11yDataPath = path.join(
    __dirname,
    '../_a11y_DATA/www.douyin.com.json',
  );
  try {
    fs.accessSync(initA11yDataPath, fs.constants.F_OK);

    startServer();
  } catch (err) {
    const a11yDouyin = JSON.stringify(mockData, null, '\t');
    fs.writeFile(initA11yDataPath, a11yDouyin, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    return;
  }
};

main();

module.exports = {
  app,
  server,
};
