# Node and npm environement:
  Updated and tested with latest dependencies using node 12.2.0 and npm 6.9.0
# Vue Client app
# Kindly do rename yor application in package.json name
# Pre-requisite
- NPM and/or Yarn installed
# Steps
- Install vue cli 3 [VUE CLI 3](https://cli.vuejs.org/guide/installation.html) 
```sh
    npm install -g @vue/cli
    # OR
    yarn global add @vue/cli
    # Check using
    vue --version
```
- Navigate to project client/app and execute
```sh
    npm install
```
- execute below command it start browser which help for run, build, testing etc
```sh
    vue ui
```
- You can also use cmd for executing
```sh
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "test:unit": "vue-cli-service test:unit",
    "test:e2e": "vue-cli-service test:e2e"
```
- once vue ui started click on import and add your app (it emit error if node_module not installed )
- go to tasks menu and click on Serve (for running app) 
- Other option like build , analyzer, plugin installation etc.
- You can also updating serve execution script in package.json by adding
```sh
Usage: vue-cli-service serve [options] [entry]

Options:
  --open    open browser on server start
  --copy    copy url to clipboard on server start
  --mode    specify env mode (default: development)
  --host    specify host (default: 0.0.0.0)
  --port    specify port (default: 8080)
  --https   use https (default: false)
```
  VSCode Setting:
  Install eslint extension
  This is for vue client application formatting you can add your other plugins related to Golang, Python, todo Highlight, theme etc
  ```
  {
  "editor.fontFamily": "Fira Code, Menlo, Monaco, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.fontSize": 14,
  "workbench.colorTheme": "Visual Studio Dark",
  "nativescript.analytics.enabled": false,
  "window.zoomLevel": 0,
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "javascript",
      "autoFix": true
    }
  ],
}
  ```sh
  Ctrl + S => shall format your code (multiple save action may require)

  -- edit: .eslintrc.js file update "plugin:vue/recommended" to "plugin:vue/strongly-recommended"
  -- edit: .eslintignore file add update src/* to src/*.js
  -- run: npm run lint and resolve the issue you are facing refer : https://vuejs.github.io/eslint-plugin-vue/rules/