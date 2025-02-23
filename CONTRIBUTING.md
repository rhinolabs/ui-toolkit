# Contributing to Rhinolabs UI Toolkit

Thank you for your interest in contributing to Rhinolabs UI Toolkit! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md). We expect all contributors to adhere to these guidelines to ensure a positive and inclusive environment.

## Development Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/your-username/ui-toolkit.git
cd ui-toolkit
```

2. Install pnpm (if not already installed):
```bash
npm install -g pnpm
```

3. Install dependencies:
```bash
pnpm install
```

4. Build all packages:
```bash
pnpm build
```

## Project Structure

The repository is organized as a monorepo using pnpm workspaces:

```
ui-toolkit/
├── packages/
│   ├── ui/          # React components
│   ├── hooks/       # React hooks
│   └── docs/        # Documentation website
├── .github/         # GitHub configuration
└── package.json     # Root package.json
```

## Development Workflow

1. Create a new branch for your feature/fix:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and test them:
```bash
# Build all packages
pnpm build

# Run tests
pnpm test

# Run linting
pnpm lint
```

3. Update documentation if necessary (in the `packages/docs` directory)

4. Commit your changes following our commit guidelines

## Pull Request Labels

When submitting a pull request, please add one of the following labels based on the nature of your changes:

- `enhancement`: New features or improvements to existing functionality
- `breaking`: Changes that break backward compatibility
- `bug`: Bug fixes and patches

This helps maintainers understand the impact of your changes and handle them appropriately.

## Pull Request Process

1. Update the README.md or documentation with details of changes if appropriate
2. Update the CHANGELOG.md following the existing format
3. Ensure all tests pass and linting rules are satisfied
4. Submit the PR with a clear title and description
5. Link any related issues using GitHub keywords (fixes #123)

## Coding Standards

### General

- Use TypeScript for all code
- Follow the existing code style
- Write clear, descriptive variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Documentation

- Keep documentation up to date
- Include usage examples
- Document props and return values
- Add TypeScript types
- Include live examples where possible

## Questions or Need Help?

Feel free to open an issue with questions or reach out to the maintainers.

## License

By contributing to Rhinolabs UI Toolkit, you agree that your contributions will be licensed under its MIT License.
