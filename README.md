# Ontario Frontend

Welcome to the Ontario Frontend monorepo, the centralized codebase for the Ontario Frontend development toolkit. This monorepo contains a suite of packages and tools designed to accelerate the development of accessible, efficient, and consistent web experiences across the Ontario government digital platforms.

## Monorepo Structure

The monorepo is structured to include various packages:

- **`/packages/ontario-frontend`**: The core frontend framework providing UI components, utilities, tools, and configurations tailored for building Ontario Frontend applications

- **`/packages/ontario-frontend-cli`**: A command-line interface (CLI) tool for scaffolding new projects, streamlining development workflows, and managing project configurations efficiently

- **`/packages/eslint-config-ontario-frontend`**: ESLint configurations tailored for the Ontario Frontend ecosystem, ensuring code quality and consistency across projects.

- **`/packages/prettier-config-ontario-frontend`**: Prettier configurations designed to maintain a consistent coding style within the Ontario Frontend projects.

## Features

- **Simple to use**: A single command creates and configures a new project structure with sensible defaults and best practices in place.
- **Automated project scaffolding**: Generates all necessary files, from configs to templates, to get you up and running quickly.
- **Built-in development server**: A built-in development server with live reloading allows you to preview your site as you work.
- **Ontario.ca Design System**: The toolkit comes pre-configured with the [Ontario.ca Design System](https://design.ontario.ca/) and the Ontario.ca Branding Kit.
- **Ontario.ca standards**: Templating and styling designed to meet the guidelines and standards for Ontario.ca.
- **Internationalization support**: Tools and structures to support English and French language sites, allowing for seamless content delivery across languages.

## Usage

Visit the [ontario-frontend-cli](packages/ontario-frontend-cli) package for instructions and information.

## Development

### Getting Started

1. **Clone the Repository**

   Clone this repository to your local machine to begin working with the Ontario Frontend Monorepo:

   ```bash
   git clone https://github.com/ongov/ontario-frontend.git
   cd ontario-frontend
   ```

2. **Install Dependencies**

   This monorepo uses `pnpm` for efficient dependency management. Install `pnpm` if you haven't already, and then install all necessary dependencies:

   ```bash
   pnpm install
   ```

3. **Explore and Develop**

   Each package within the monorepo has its own specific setup and instructions. Navigate to the package directory of interest for more detailed information:

   ```bash
   cd packages/<package-name>
   ```

### Development Workflow

- **Local Development**: Refer to each package's README for commands to start development environments and for specific development instructions.

## Documentation

Explore the Documentation to learn about every aspect of the toolkit--from installation and file structure to adding analytics and preparing for deployment. The documentation is available at [our dev site](our dev site).

## Contributing

Contributions to the [Ontario Frontend monorepo](https://github.com/ongov/ontario-frontend/tree/main) are welcome! Whether it's bug reports, feature requests, or contributions to code, we appreciate your input.

Check out our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute.

## License

This project is licensed under the [Open Government Licence - Ontario](https://www.ontario.ca/page/open-government-licence-ontario). Feel free to use, modify, and distribute it as needed.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ongov/ontario-frontend/tags).
