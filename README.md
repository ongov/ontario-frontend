# Ontario Frontend

The Ontario Frontend is a web development kit that provides a framework and command-line interface (CLI) tool that streamlines the creation and management of Frontend projects for Ontario.ca. Inspired by tools like [Create React App](https://github.com/facebook/create-react-app) and built on top of [Eleventy](https://www.11ty.dev/), the toolkit provides a simple and efficient starting point for building accessible, performant, and scalable websites using the Eleventy static site generator.

## Features

- **Simple to use**: A single command creates and configures a new project structure with sensible defaults and best practices in place.
- **Automated project scaffolding**: Generates all necessary files, from configs to templates, to get you up and running quickly.
- **Built-in development server**: A built-in development server with live reloading allows you to preview your site as you work.
- **Ontario.ca Design System**: The toolkit comes pre-configured with the [Ontario.ca Design System](https://design.ontario.ca/) and the Ontario.ca Branding Kit.
- **Ontario.ca standards**: Templating and styling designed to meet the guidelines and standards for Ontario.ca.
- **Internationalization support**: Tools and structures to support English and French language sites, allowing for seamless content delivery across languages.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher)

### Installation

Install the toolkit globally using npm:

```bash
npm install -g @ontario-digital-service/ontarioca-toolkit-core
```

### Creating a new application

To create a new app, use the `create-ontario-app` command:

```bash
create-ontario-app
```

This will walk you through the project creation. It will also scaffold the project, set up all necessary files and configuration, and install all necessary dependencies.

For more information on the setup, visit the [Getting Started](https://github.com/ongov/Ontario.ca-Jamstack-Toolkit/wiki/Getting-started-with-the-Ontario.ca-Jamstack-Toolkit) guide.

### Running the development server

To run the development server, use the `serve` command:

```bash
cd my-ontario-project
npm run serve
```

This will start the development server on port 8080. You can then view your site at [http://localhost:8080](http://localhost:8080).

### Building for production

To build your site for production, use the `build` command:

```bash
cd my-ontario-project
npm run build
```

This will build your site and output the static files to the `dist` directory.

## Documentation

Explore the Documentation to learn about every aspect of the toolkit--from installation and file structure to adding analytics and preparing for deployment. The documentation is available at [https://ontario-digital-service.github.io/ontarioca-toolkit-core/](https://ontario-digital-service.github.io/ontarioca-toolkit-core/).

## Contributing

We welcome contributions to the toolkit! Please read our [Contributing Guide](CONTRIBUTING.md) for guidelines on how to propose bugfixes, new features, and submit pull requests.

## License

The Ontario.ca Jamstack Toolkit is licensed under the Apache License 2.0 License - see the [LICENSE](LICENSE) file for details.
