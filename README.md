---

## Ontario.ca Frontend is now in maintenance mode

On September 3, 2024, **Ontario.ca Frontend** entered maintenance mode, pending further organizational review and realignment.

The Ontario.ca team will no longer be adding new features or functionality to Ontario.ca Frontend. Existing applications built with Ontario.ca Frontend will continue to function normally, and delivery teams using it can continue to develop their projects based as they do today. Documentation for using Ontario.ca Frontend will remain available on [developer.ontario.ca/frontend](https://developer.ontario.ca/frontend/), and the source code for the project will remain archived on GitHub.

Ontario.ca Frontend's underlying components continue to be well-supported and actively-maintained open source projects that any delivery team can continue using in its projects. The primary dependency, [Eleventy](https://11ty.dev/), is thoroughly documented and supported by both industry and community members.

---

# Ontario.ca Frontend

A developer toolkit designed for teams that want to create maintainable, performant and dynamic user experiences for Ontario.ca.

## Table of Contents

- [Monorepo Structure](#monorepo-structure)
- [Features](#features)
- [Usage](#usage)
- [Development](#development)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Versioning](#versioning)

## Monorepo structure

This monorepo serves as the central codebase for Ontario.ca Frontend. It contains a suite of packages and tools designed to accelerate the development of accessible, efficient, and consistent experiences across Ontario.ca.

This repository includes several Ontario.ca Frontend packages:

- **`/packages/ontario-frontend`**: The core frontend framework, providing UI components, utilities, tools, and configurations tailored for building Ontario.ca Frontend applications.

- **`/packages/ontario-frontend-cli`**: A command-line interface tool for scaffolding new projects, streamlining development workflows, and managing project configurations efficiently.

- **`/packages/eslint-config-ontario-frontend`**: ESLint configurations tailored for the Ontario.ca Frontend ecosystem, ensuring code quality and consistency across projects.

- **`/packages/prettier-config-ontario-frontend`**: Prettier configurations designed to maintain a consistent coding style within the Ontario.ca Frontend projects.

## Features

- **Simple to use**: A single command creates and configures a new project structure with sensible defaults and best practices in place.

- **Automated project scaffolding**: Generates all necessary files, from configs to templates, to get you up and running quickly.

- **Built-in development server**: A built-in development server with live reloading allows you to preview your site as you work.

- **Ontario Design System**: The toolkit comes pre-configured with the [Ontario Design System](https://design.ontario.ca/) and the Ontario.ca Branding Kit.

- **Ontario.ca standards**: Templating and styling designed to meet the guidelines and standards for Ontario.ca.

- **Internationalization support**: Tools and structures to support English and French language sites, allowing for seamless content delivery across languages.

## Usage

Visit the [ontario-frontend-cli](packages/ontario-frontend-cli) package for instructions and information.

## Development

### Getting started

1. **Clone the repository**

   Clone this repository to your local machine to begin working with the Ontario.ca Frontend monorepo:

   ```bash
   git clone https://github.com/ongov/ontario-frontend.git
   cd ontario-frontend
   ```

2. **Install dependencies**

   This monorepo uses [pnpm](https://pnpm.io) for efficient dependency management. Install pnpm if you haven't already, and then install all necessary dependencies:

   ```bash
   pnpm install
   ```

3. **Explore and develop**

   Each package within the monorepo has its own setup and instructions. Navigate to the package directory of interest for more detailed information:

   ```bash
   cd packages/<package-name>
   ```

### Development workflow

- **Local development**: Refer to each package's README to find development instructions and commands to start development environments.

## Documentation

Explore the documentation to learn about every aspect of the toolkit--from installation and file structure to adding analytics and preparing for deployment. The documentation is available at [developer.ontario.ca](https://developer.ontario.ca).

## Contributing

Contributions to [Ontario.ca Frontend](https://github.com/ongov/ontario-frontend/tree/main) are welcome! Whether it's bug reports, feature requests, or contributions to code, we appreciate your input.

Check out our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute.

## License

Licensed under Apache License 2.0.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ongov/ontario-frontend/tags).

### Changes with Lerna

We have integrated [Lerna](https://lerna.js.org/) to manage and streamline the process of versioning and publishing packages independently. Here are the updated development steps involving Lerna:

1. **Bootstrap the Monorepo**

   To install dependencies and link packages:

   ```bash
   pnpm run bootstrap
   ```

2. **Version and Publish Packages**

   To update versions based on conventional commits and publish packages:

   ```bash
   pnpm run update:version
   pnpm run publish
   ```

3. **Clean the Monorepo**

   To clean the monorepo by removing `node_modules` and build artifacts:

   ```bash
   pnpm run clean
   ```
