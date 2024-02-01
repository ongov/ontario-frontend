# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2023-12-18

### Added

- New README file for the project with comprehensive documentation on the features, installation, and use of the Ontario.ca Jamstack Toolkit.

### Changed

- Improved instructions for installing the toolkit locally using `npm link` and globally with `npm i -g @ontario-digital-service/ontarioca-toolkit-core`.

### Fixed

- Ensured that the `create-ontario-app --local` command successfully finds the local version based on the directory of execution `'path.join(__dirname, '../')'`.

## [1.0.1] - 2023-12-13

### Added

- The `--local` option to the CLI allowing developers to work with a local version of the ontarioca-toolkit-core for development and testing purposes.
