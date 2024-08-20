<h2 align="center">
  <img width="70" src="https://sf16-sg.tiktokcdn.com/obj/eden-sg/plduhogbps/image/a11y-icon.png" >
  <p>无障碍云标签-助力视障群体</p>
</h2>
无障碍解决方案，不再需要前端开发者持续写代码适配。只需接入云标签sdk后，根据云标签定义的数据规则，使用标注工具进行可视化配置，并实时进行无障碍测试，该工作全程可由 0 研发基础的QA或其他角色完成。
（当UI视图结构动态变化时，云标签sdk会根据页面内容实时生成新的无障碍属性）

[English Version](./README.md)

### 环境要求

Node: 建议使用 **node v18.12.0** 或更高版本

浏览器: 依赖 [Socket.IO](https://www.npmjs.com/package/socket.io)
![Client 版本](https://camo.githubusercontent.com/40fa0971ae4554132eaa9669afdc0a5ed63c315de05dcf22fdb68a6cdec42728/68747470733a2f2f73617563656c6162732e636f6d2f62726f777365722d6d61747269782f736f636b65742e737667)

### 快速体验

1. 安装依赖

```
$ yarn bootstrap
```

2. 构建 **mark tool** 与 **runtime sdk** 并启动 **node server**

```
$ yarn build
```

选择运行 example

```
? Please choose usage:
❯ Run example
  Run packages
```

选择运行 nodejs-server

```
? Please choose usage: Run example
? Please choose examples:
  a11y-webpack-loader-react
❯ nodejs-server
```

3. 等待构建结束，会自动打开 http://localhost:3001/index.html 标注面板并连接 socket

4. 打开你的项目，在代码中引入sdk；或在浏览器打开任意网站，通过devtool控制台引入sdk。随后即可在 http://localhost:3001/index.html 标注面板开始无障碍标注

```js
const script = document.createElement("script");
script.src = "http://localhost:3001/sdk.min.js";
document.body.appendChild(script);
```

### 快速接入部署

想要在你的工程中接入无障碍云标签，方式如下：

1. 使用 `Build` 命令构建前端产物，随后将 `packages/a11y-web-client/dist` 产物放入你的资源平台，将 `packages/a11y-web-sdk/dist` 产物引入你的项目（也可以直接将源代码接入你自己的项目进行构建）。

```
$ Yarn build
```

选择构建 packages

```
? Please choose usage:
  Run example
❯ Run packages
```

选择构建 a11y-web-client 和 a11y-web-sdk

```
? Please choose usage: Run packages
? Please select the corresponding debug packages (multiple selections allowed, use space to
 select, supports fuzzy search):
 ◉ a11y-web-client
❯◉ a11y-web-sdk
 ◯ a11y-web-socket
 ◯ a11y-webpack-loader
```

构建完成后调整产物位置

2. 将 `packages/a11y-web-socket` 目录下的 nodejs 代码部署在你的服务器，通过命令启动(提醒：修改端口配置 `config/deployment.config.js`)

```
$ cd packages/a11y-web-socket && npm run start
```

3. 按照 `examples/nodejs-server` 目录下的 mock 接口 interface 实现，存入你自己的数据库。(提醒：修改端口配置 `config/deployment.config.js`)

### 云标签标准数据说明

**A11yTag Interface**

<table>
  <tr>
    <th>字段名</th>
    <th>字段介绍</th>
    <th>字段类型</th>
  </tr>
  <tr>
    <td>desc</td>
    <td>无障碍的功能描述</td>
    <td>string</td>
  </tr>
  <tr>
    <td>attrs</td>
    <td>云标签sdk会直接将attrs内的属性设置在目标元素上</td>
    <td>AttrsProps</td>
  </tr>
  <tr>
    <td>aid</td>
    <td>元素的a11y-id的属性值，通过a11y-loader生成，用来选择元素</td>
    <td>string</td>
  </tr>
  <tr>
    <td>query</td>
    <td>元素的css Selector，用来选择元素（与aid二选一使用）</td>
    <td>string</td>
  </tr>
  <tr>
    <td>calcAttrs</td>
    <td>计算规则定义，该条目下会告知云标签sdk如何通过现有页面元素的信息去生成无障碍属性</td>
    <td>CalcAttrsProps</td>
  </tr>
</table>
<br/>

**AttrsProps Interface**

<table>
  <tr>
    <th>字段名</th>
    <th>字段介绍</th>
    <th>字段类型</th>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>焦点顺序，遵循w3c</td>
    <td>string | number</td>
  </tr>
  <tr>
    <td>role</td>
    <td>如buton、link、dialog等，遵循w3c</td>
    <td>string</td>
  </tr>
</table>

- 该类别下可支持任意标准html元素属性。
  <br/><br/>

**CalcAttrsProps Interface**

<table>
  <tr>
    <th>字段名</th>
    <th>字段介绍</th>
    <th>字段类型</th>
  </tr>
  <tr>
    <td>label</td>
    <td>句子，一个焦点的最终朗读结果</td>
    <td>LabelProps</td>
  </tr>
</table>
<br/>

**LabelProps Interface**

<table>
  <tr>
    <th>字段名</th>
    <th>字段介绍</th>
    <th>字段类型</th>
  </tr>
  <tr>
    <td>list</td>
    <td>片段，一个句子包含多个片段</td>
    <td>ListProps</td>
  </tr>
  <tr>
    <td>terms</td>
    <td>条件，指定片段在某个或多个条件下生效</td>
    <td>termsProps</td>
  </tr>
</table>
<br/>

**ListProps Interface**

<table>
  <tr>
    <th>字段名</th>
    <th>字段介绍</th>
    <th>字段类型</th>
  </tr>
  <tr>
    <td>list</td>
    <td>片段，一个句子包含多个片段</td>
    <td>WordProps[]</td>
  </tr>
</table>
<br/>

**WordProps Interface**

<table>
  <tr>
    <th>字段名</th>
    <th>字段介绍</th>
    <th>字段类型</th>
  </tr>
  <tr>
    <td>aid</td>
    <td>元素的a11y-id的属性值，通过a11y-loader生成，用来选择元素</td>
    <td>string</td>
  </tr>
  <tr>
    <td>query</td>
    <td>元素的css Selector，用来选择元素</td>
    <td>string</td>
  </tr>
  <tr>
    <td>value</td>
    <td>固定文案拼接</td>
    <td>string</td>
  </tr>
  <tr>
    <td>opt</td>
    <td>单词处理方式：默认为追加（+），可以设置为删减（-）</td>
    <td>'-' ｜ '+'</td>
  </tr>
  <tr>
    <td>map</td>
    <td>将包含特定属性元素进行文案映射</td>
    <td>AttrMap</td>
  </tr>
</table>
<br/>

**AttrMap Interface**

<table>
  <tr>
    <th>字段名</th>
    <th>字段介绍</th>
    <th>字段类型</th>
  </tr>
  <tr>
    <td>type</td>
    <td>映射的类型，固定为属性</td>
    <td>'attr'</td>
  </tr>
  <tr>
    <td>attr</td>
    <td>映射的属性，如图片使用'src'</td>
    <td>string</td>
  </tr>
  <tr>
    <td>match</td>
    <td>匹配规则</td>
    <td>{ [string]: string }</td>
  </tr>
</table>
<br/>

**termsProps Interface**

<table>
  <tr>
    <th>字段名</th>
    <th>字段介绍</th>
    <th>字段类型</th>
  </tr>
  <tr>
    <td>bool</td>
    <td>生效条件，是或否</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>check</td>
    <td>规则类型，当前支持：是否存在、是否为数字</td>
    <td>'exist' | 'number'</td>
  </tr>
  <tr>
    <td>aid</td>
    <td>元素的a11y-id的属性值，通过a11y-loader生成，用来选择元素</td>
    <td>string</td>
  </tr>
  <tr>
    <td>query</td>
    <td>元素的css Selector，用来选择元素</td>
    <td>string</td>
  </tr>
</table>
<br/>

### 目录介绍

```
.
├── CONTRIBUTING.CN.md
├── CONTRIBUTING.md
├── DSL.js                         // 云标签标准数据说明
├── LICENSE
├── README.CN.md
├── README.md
├── commitlint.config.js
├── config
│   ├── deployment.config.js       // 部署配置，可根据需要修改
│   └── webpack.base.config.js     // 基础的 webpack 配置
├── examples
│   ├── a11y-webpack-loader-react  // React 项目使用 a11y-webpack-loader 自动生成 a11y-id 属性示例
│   └── a11y-nodejs-server         // 使用 nodejs 搭建的数据处理服务示例
├── lerna.json
├── package-lock.json
├── package.json
├── packages
│   ├── a11y-web-client            // 云标签标注工具🔧，支持标注过程高亮、功能实时生效
│   ├── a11y-web-sdk               // 云标签运行时sdk，在代码中接入无障碍能力
│   ├── a11y-web-socket            // 云标签服务，提供socket标注能力
│   └── a11y-webpack-loader        // webpack构建loader，添加固定的a11y-id属性便于标注。（支持JSX源代码或产物代码）
├── script
│   ├── build.js
│   ├── clean.js
│   ├── start.js
│   ├── test.js
│   └── utils.js
└── yarn.lock
```

### 联系我们

如果有任何问题，可以通过提 issue 或评论的方式联系我们，我们会在三个工作日内回复。

### License

无障碍云标签 使用 Apache License 2.0 。
