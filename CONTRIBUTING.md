# Contributing

- [Contributing](#contributing)
  - [Initial Requirements](#initial-requirements)
  - [Environment Setup](#environment-setup)
  - [Commit Your Changes](#commit-your-changes)
  - [Creating a Changeset](#creating-a-changeset)

This brief guide will provide essential instructions to help you take your first steps in this project.

We appreciate any contribution you wish to make, from reporting a bug to proposing a new feature or simply spreading the word about this project.

If it's your first time contributing to an open-source project and you want to explore this topic in detail, refer to this free resource: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

## Initial Requirements

Before contributing to the project, make sure you have the following initial requirements:
  - An updated version of [Git](https://git-scm.com/);
  - The LTS or Current version of [Node.js](https://nodejs.org/);
  - The [PNPM package manager](https://pnpm.io/installation) updated to the latest version.

Fork this repository by clicking the "Fork" button in the upper right. This will create a copy of the repository in your GitHub account.

Clone your fork locally using Git:

```sh
git clone https://github.com/your-username/esbuild-plugin-lit-css.git
```

## Environment Setup

Install project dependencies using the command:
```sh
pnpm install
```

If you encounter issues during the installation of dependencies, in most cases, they are related to an incorrect setup of the requirements listed above.

Remember that tests are essential to us. Please make sure they align with the changes you introduce.

To ensure everything is formally correct before opening a Pull Request, run the following commands:

```sh
pnpm run check
pnpm run test:ci
```

To ensure that tests cover all lines of code, you can generate a test coverage report with a specific command:

```sh
pnpm run test:cov
```

It's also crucial that the project build runs smoothly when the Pull Request is being reviewed. For this reason, before committing your changes, run the following command:

```sh
pnpm run build
```

If there are no errors, you have the green light to proceed! 🚀

## Commit Your Changes

At the end of your work, commit your changes and push them to your fork. An automation hook at pre-commit performs TypeScript type-checking, ESLint linting, runs unit tests and formats the code with Prettier.

```sh
git add .
git commit -m "<prefix>: brief description of the changes"
git push origin stable
```

In commit messages, we tend to use these prefixes to indicate the nature of the changes better:

  - `chore`: used for commits related to maintenance tasks.
  - `feat`: used for commits introducing new features.
  - `test`: used for commits related to test creation and management.
  - `fix`: used for commits that address various non-critical bugs or issues.
  - `hotfix`: used for commits that fix critical production issues.

Once done, you must create a Pull Request from [this section](https://github.com/detra-lab/esbuild-plugin-lit-css/pulls) of the original repository.
Ensure you clearly describe your changes or include a link to a GitHub Issue if one already exists.

## Creating a Changeset

If your review passes, you'll be asked to generate a Changeset to automate the publication of changes to the NPM registry. To do this, run the following command:

```sh
pnpm run changeset
```

Following [semantic versioning](https://semver.org/) conventions, choose between `patch`, `minor`, or `major`. Then, please summarize the changes made and how they impact library consumers. If it's a change that introduces breaking changes, try to provide helpful advice on how to migrate effectively.
