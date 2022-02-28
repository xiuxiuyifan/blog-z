# 环境搭建

## 使用 rollup


```shell
yarn init 
tsc --init
```

```shell
yarn add 
rollup                     
rollup-plugin-serve         
rollup-plugin-typescript2  
typescript                 使用 typescript
```

创建建配置文件
```javascript
import path from "path";
import ts from 'rollup-plugin-typescript2' // typescript 解析插件 
import serve from 'rollup-plugin-serve'  //rollup起本地服务
import livereload from 'rollup-plugin-livereload'  // 热更新

export default {
  input: './src/index.ts',
  output: {
    file: path.resolve(__dirname, 'dist/bundle.js'),
    format: 'iife',  // 自执行函数
    sourcemap: true
  },
  plugins: [
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    livereload({
      watch: 'dist',
      port: 3000,
      delay: 300
    }),
    serve({
      port: 3000,
      contentBase: ''
    })
  ]
}
```