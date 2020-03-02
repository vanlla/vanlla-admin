# vanlla-admin

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

## ESLint workspace settings.json

```
{
    "prettier.semi": false,
    "editor.fontSize": 16,
    "prettier.singleQuote": true,
    "eslint.options": {
      "configFile": ".eslintrc.js"
    },
    "eslint.validate": ["javascript", "html", "vue"],
    "editor.tabSize": 2,
    "editor.formatOnSave": true,
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.format.defaultFormatterOptions": {
      "js-beautify-html": {
        "wrap_attributes": "force"
      }
    },
    "path-autocomplete.pathMappings": {
      "@": "${folder}/src"
    },
    "git.ignoreLimitWarning": true
  }
```
