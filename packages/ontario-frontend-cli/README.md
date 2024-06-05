<img src="../ontario-frontend/src/assets/img/ontario_ogp_image.png" alt="Ontario.ca Logo" width="200"/>

# @ongov/ontario-frontend-cli

The `ontario-frontend-cli` package is part of the Ontario.ca Frontend monorepo. It is a command line tool designed to streamline the creation and development of Ontario.ca Frontend applications and projects. It provides a simple interface to scaffold new projects, configure them with essential dependencies, and prepare them for development using Ontario.ca Frontend.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Versioning](#versioning)

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
npx @ongov/ontario-frontend-cli ontario-create-app
```

This method is useful for a one-off execution where you don't need to (or don't want to) keep the CLI tool installed globally on your system.

## Usage

Once installed, you can create a new project by running:

```sh
ontario-create-app
```

Follow the interactive prompts to configure your project's settings, such as project name and paths.

### Options

- `--local`: Use a local version of the Ontario.ca Frontend core dependency. This is useful for development or testing against a local copy of the framework.

Example:

```sh
ontario-create-app --local
```

This command initializes a new project and links it to a local version of the Ontario.ca Frontend framework.

## Documentation

Explore the documentation to learn about every aspect of the toolkit--from installation and file structure to adding analytics and preparing for deployment. The documentation is available at [developer.ontario.ca](https://developer.ontario.ca).

## Contributing

Contributions to the [Ontario.ca Frontend](https://github.com/ongov/ontario-frontend/tree/main/packages/ontario-frontend) are welcome. Whether it's bug reports, feature requests, or contributions to code, we appreciate your input.

Check out our [CONTRIBUTING.md](https://github.com/ongov/ontario-frontend/tree/main/CONTRIBUTING.md) file for guidelines on how to contribute.

## License

This project is licensed under the [Open Government Licence - Ontario](https://www.ontario.ca/page/open-government-licence-ontario). Feel free to use, modify, and distribute it as needed.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ongov/ontario-frontend/tags).
