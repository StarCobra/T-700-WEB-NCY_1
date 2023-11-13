# The Count of Money

## Scripts

### start
The `start` script is used to launch the development server. It is responsible for running the application in development mode.
```bash
npm start
```

### build

The `build` script is used to create a production-ready build of the application. It generates optimized and minified files for deployment.

```bash
npm run build
```

### eject
The `eject` script is used to eject the project configuration from the default configuration provided by react-scripts. It provides more control over the configuration but comes with the trade-off of losing some of the benefits of the pre-configured setup.
```bash
npm run eject
```

### lint
The `lint` script uses ESLint to analyze the source code and identify potential issues. It checks files with the extensions .js, .jsx, .ts, and .tsx within the src directory.
```bash
npm run lint
```

### fix
The `fix` script uses Prettier to automatically format the code and make it consistent. It formats all JavaScript and TypeScript files in the project, excluding the node_modules directory.
```bash
npm run fix
```

### lint-fix
The `lint-fix` script combines ESLint and Prettier to automatically fix linting issues and format the code. It first runs ESLint with the --fix option and then uses Prettier to format the modified files.
```bash
npm run lint-fix
```