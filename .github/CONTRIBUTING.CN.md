## Pull Request 指南

[English Version](./CONTRIBUTING.md)

要提交一个 Pull Request，请遵循以下步骤：

- Node.js > v18

- Fork 项目并克隆下来

```bash
git clone https://github.com/<your-username>/a11y-cloud.git
cd a11y-cloud
```

- 检出你的主题分支

```bash
git checkout -b <TOPIC_BRANCH_NAME>
```

- 完成项目依赖安装

```bash
yarn bootstrap
```

- 启动开发调试，完善你的代码

```bash
yarn start
```

- 新建一个 Pull Request 到源项目的 `main` 分支，此时 `a11y-web-sdk` 和 `a11y-webpack-loader` 会自动发布 alpha 版本的 npm 包供测试使用

我们可能会根据情况要求或帮助你修改PR，感谢～
