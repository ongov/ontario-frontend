# @ongov/eslint-config-ontario-frontend

This package provides the shared ESLint configuration used by Ontario Frontend projects. It enforces a consistent code style for JavaScript projects to help keep code clean and readable.

## Features

- **Print Width**: Set to 80 characters to maintain readability across various devices and editors.
- **Tab Width**: Uses 2 spaces for indentation to ensure code is clean and readable.
- **Semicolons**: Requires semicolons at the end of statements for clarity.
- **Single Quotes**: Enforces the use of single quotes for strings, except in Markdown files where double quotes are preferred.
- **Trailing Commas**: Requires trailing commas in multi-line objects, arrays, etc., which makes version control diffs cleaner.
- **Bracket Spacing**: Ensures spaces are present inside object literal braces for better readability.
- **Bracket Same Line**: Places the closing angle bracket of elements on the same line as the last prop.
- **Overrides for Markdown**: For `.md` files, double quotes are used instead of single quotes.

## Installation

To use the @ongov/eslint-config-ontario-frontend in your project, follow the steps for based on your package manager:

### NPM

1. First, you need to install [ESLint](http://eslint.org) if it's not already installed:

    ```sh
    npm install eslint --save-dev
    ```

2. Next, install the `@ongov/eslint-config-ontario-frontend` package:

    ```sh
    npm install @ongov/eslint-config-ontario-frontend --save-dev
    ```

### PNPM

1. First, you need to install [ESLint](http://eslint.org) if it's not already installed:

    ```sh
    pnpm add eslint -D
    ```

2. Next, install the `@ongov/eslint-config-ontario-frontend` package:

    ```sh
    pnpm add @ongov/eslint-config-ontario-frontend -D
    ```

## Usage

After installation, you'll need to set up your ESLint configuration file if you haven't already. Here's how:

1. Create a file named `.eslintrc.json` in your project's root directory.

2. Add the following content to .eslintrc.json to extend the @ongov/eslint-config-ontario-frontend configuration:

    ```json
    {
        "extends": "@ongov/eslint-config-ontario-frontend"
    }
    ```

This line tells ESLint to use the `@ongov/eslint-config-ontario-frontend` rules for your project.

## Customizing

If you need to override any rules, you can do so within your project's .eslintrc file. For example:

```json
{
  "extends": "@ongov/eslint-config-ontario-frontend",
  "rules": {
    "no-unused-vars": "warn",
    "semi": ["error", "never"]
  }
}
```

This customization will change the handling of unused variables to a warning and remove the requirement for semicolons.

## Documentation

Explore the Documentation to learn about every aspect of the toolkit--from installation and file structure to adding analytics and preparing for deployment. The documentation is available at [our dev site](our dev site).

## Contributing

Contributions to the [Ontario Frontend ESLint Config](https://github.com/ongov/ontario-frontend/tree/main/packages/eslint-config-ontario-frontend) are welcome! Whether it's bug reports, feature requests, or contributions to code, we appreciate your input.

Check out our [CONTRIBUTING.md](https://github.com/ongov/ontario-frontend/tree/main/CONTRIBUTING.md) file for guidelines on how to contribute.

## License

This project is licensed under the [Open Government Licence - Ontario](https://www.ontario.ca/page/open-government-licence-ontario). Feel free to use, modify, and distribute it as needed.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ongov/ontario-frontend/tags).
