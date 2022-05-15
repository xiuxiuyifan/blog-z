## js 配置规则

env ： 在不同的环境里面有不同的环境变量

basic.js

```js
module.exports = {};
```

## ts 配置规则

```ts
module.exports = {
  parser '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  }
  extends: ['./basic', 'plugin:@typescript-eslint/recommended']
}
```

## react

```js

```

## vue

```js
module.exports = {
  extends: ["./typescript", "plugin:vue/vue3-recommended"],
  overrides: [
    {
      file: ["*.vue"],
      parser: "vue-eslint-parser", // 用 vue-eslint-parser 解析完 .vue 文件之后再交给 typescript-eslint/parser
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
};
```
