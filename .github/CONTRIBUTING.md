## Pull Request Guide

[中文版本](./CONTRIBUTING.CN.md)

To submit a Pull Request, please follow these steps:

- Ensure Node.js version is greater than v18.

- Fork the project and clone it to your local machine.

```bash
git clone https://github.com/<your-username>/a11y-cloud.git
cd a11y-cloud
```

- Check out your topic branch.

```bash
git checkout -b <TOPIC_BRANCH_NAME>
```

- Complete the installation of project dependencies.

```bash
yarn bootstrap
```

- Start development and debugging, and refine your code.

```bash
yarn start
```

- Create a Pull Request to the `main` branch of the source project. At this point, `a11y-web-sdk` and `a11y-webpack-loader` will automatically publish alpha versions of npm packages for testing.

We may request or assist you in modifying the PR as needed, thank you!
