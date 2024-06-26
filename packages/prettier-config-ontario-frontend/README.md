<img src="../ontario-frontend/src/assets/img/ontario_ogp_image.png" alt="Ontario.ca Logo" width="200"/>

# @ongov/prettier-config-ontario-frontend

This package provides the [Prettier](https://prettier.io) configuration adhering to the Ontario.ca Frontend JavaScript style guide, which will be released in the future. This configuration aims to ensure consistency and readability in Ontario.ca Frontend projects.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Customizing](#customizing)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Versioning](#versioning)

## Features

- **Print width**: Limits lines to 80 characters to enhance readability across various devices and editors, ensuring code does not stretch too far horizontally.

- **Tab width**: Utilizes 2 spaces for indentation, promoting a clean and consistent visual structure across the codebase.

- **Semicolons**: Enforces the use of semicolons at the end of statements, reducing the potential for parsing errors and improving code clarity.

- **Single quotes**: Prefers single quotes for strings to maintain consistency and readability, except where overridden by specific file type configurations.

- **Trailing commas**: Requires trailing commas in multi-line objects, arrays, function parameters, etc., facilitating easier version control diffs and cleaner code addition or removal.

- **Bracket spacing**: Ensures spaces are present inside object literal braces, {}, improving readability by visually separating blocks of code.

- **Bracket same line**: Configures the closing angle bracket of elements to be placed on the same line as the last prop, aligning with common formatting practices.

- **Arrow parens**: Always requires parentheses around arrow function parameters, ensuring clarity and consistency, especially in functions with single parameters.

- **Overrides for markdown**: Specifically for .md files, double quotes are allowed, acknowledging the different stylistic and functional requirements of markdown content.

## Installation

To integrate the Ontario.ca Frontend Prettier configuration into your project, choose one of the following methods based on your package manager:

### Using npm

1. First, you need to install [Prettier](https://prettier.io) if it's not already installed:

    ```sh
    npm install prettier --save-dev
    ```

2. Next, install the `@ongov/prettier-config-ontario-frontend` package:

    ```sh
    npm install @ongov/prettier-config-ontario-frontend --save-dev
    ```

### Using pnpm

1. First, you need to install [Prettier](https://prettier.io) if it's not already installed:

    ```sh
    pnpm add prettier -D
    ```

2. Next. install the `@ongov/prettiers-config-ontario-frontend`

    ```sh
    pnpm add @ongov/prettier-config-ontario-frontend -D
    ```

## Usage

### Basic configuration

To quickly apply the Ontario.ca Frontend Prettier configuration, create a `.prettierrc` file in your project's root directory and specify the name of the package as its value:

```json
"prettier-config-ontario-frontend"
```

## Customizing

For projects that require customization beyond the base configuration, you can extend and override specific settings. Create a `.prettierrc.js` file in your project's root directory, import the Ontario configuration, and then add your modifications:

```javascript
module.exports = {
  ...require('@ongov/prettier-config-ontario-frontend'),
  printWidth: 120,
};
```

This approach allows you to maintain the foundational style guide while tweaking aspects that are project-specific or according to your team's preferences.

## Documentation

Explore the documentation to learn about every aspect of the toolkit--from installation and file structure to adding analytics and preparing for deployment. The documentation is available at [developer.ontario.ca](https://developer.ontario.ca).

## Contributing

Contributions to the [Ontario.ca Frontend Prettier Config](https://github.com/ongov/ontario-frontend/tree/main/packages/ontario-frontend) are welcome. Whether it's bug reports, feature requests, or contributions to code, we appreciate your input.

Check out our [CONTRIBUTING.md](https://github.com/ongov/ontario-frontend/tree/main/CONTRIBUTING.md) file for guidelines on how to contribute.

## License

This project is licensed under the [Open Government Licence - Ontario](https://www.ontario.ca/page/open-government-licence-ontario). Feel free to use, modify, and distribute it as needed.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ongov/ontario-frontend/tags).
