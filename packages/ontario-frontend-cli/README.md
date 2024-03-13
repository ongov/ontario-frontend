# @ongov/ontario-frontend-cli

The `ontario-frontend-cli` package is part of the Ontario.ca Frontend monorepo. It is a command line tool designed to streamline the creation and development of Ontario.ca Frontend applications and projects. It provides a simple interface to scaffold new projects, configure them with essential dependencies, and prepare them for development using Ontario.ca Frontend.

## Features

- Scaffold new Ontario.ca Frontend projects with pre-configured templates.
- Configure projects with Eleventy, Nunjucks, and other essential tools.
- Support for creating bilingual (English and French) project structures.
- Easy integration with the Ontario.ca Frontend core dependency.

## Installation

### Using npm

To install the Ontario.ca Frontend CLI globally via npm:

```sh
npm install -g @ongov/ontario-frontend-cli
```

### Using pnpm

To install the Ontario.ca Frontend CLI globally via pnpm:

```sh
pnpm add -g @ongov/ontario-frontend-cli
```

### Running directly with npx

If you'd rather not install the CLI tool globally, you can run it directly with npx:

```sh
npx @ongov/ontario-frontend-cli create-ontario-app
```

This method is useful for a one-off execution where you don't need to (or don't want to) keep the CLI tool installed globally on your system.

## Usage

Once installed, you can create a new project by running:

```sh
create-ontario-app
```

Follow the interactive prompts to configure your project's settings, such as project name and paths.

### Options

- `--local`: Use a local version of the Ontario.ca Frontend core dependency. This is useful for development or testing against a local copy of the framework.

Example:

```sh
create-ontario-app --local
```

This command initializes a new project and links it to a local version of the Ontario.ca Frontend framework.

## Documentation

Explore our docs to learn more about Ontario.ca Frontend: [developer.ontario.ca](https://developer.ontario.ca).
