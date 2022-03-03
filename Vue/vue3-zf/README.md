# Vue3 源码学习笔记

## 1、安装依赖

```
mkdir vue3-zf

yarn init -y 
tsc --init
```

```shell
yarn add typescript rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve @rollup/plugin-json execa -D
```

| typescript                  | 支持typescript         |
| --------------------------- | ---------------------- |
| rollup                      | 打包工具               |
| rollup-plugin-typescript2   | rollup 和 ts的 桥梁    |
| @rollup/plugin-node-resolve | 解析node第三方模块     |
| @rollup/plugin-json         | 支持引入json           |
| execa                       | 开启子进程方便执行命令 |

## 2、workspace 配置

```json
{
  "private": true,
  "workspaces": [
    "packages/*"
  ],
}
```

> 目录结构

```sh
│  package.json        # 配置运行命令 
│  rollup.config.js    # rollup配置文件
│  tsconfig.json       # ts配置文件 更改为esnext
│  yarn.lock
│  
├─packages             # N个repo
│  └─reactivity
│      │  package.json
│      └─src
│          index.ts
│              
└─scripts              # 打包命令
        build.js
        dev.js
```

> 配置模块名称及打包选项

```json
{
  "name": "@vue/reactivity",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "buildOptions": {
    "name": "VueReactivity",
    "formats": [
      "esm-bundler",
      "cjs",
      "global"
    ]
  }
}
```

## 3、对packages下模块进行打包

> scripts/build.js 

[execa](https://github.com/sindresorhus/execa) 是更好的子进程管理工具（A better child_process）。本质上就是衍生一个 shell，传入的 command 字符串在该 shell 中直接处理。 

```javascript
// 目的：打包的目的就是 多个文件夹并行打包  
// 同时执行多个  rollup -c -w 命令 


// execa 可以单独开启一个子进程执行命令  ， 单独开启一个进行进行打包
import {execa} from 'execa';
// 获取 packages 目录下面所有的包
import {readdirSync, statSync} from 'fs'

let targetPath = 'packages'
// 读取 packages 目录下面所有的包， 并过滤掉不是文件夹的东西
// 拿到的是一个数组，然后进行过滤
let targets = readdirSync(targetPath).filter(item => {
  // 检测文件信息，是不是一个文件夹
  return statSync(`${targetPath}/${item}`).isDirectory()
})
// 此时下面已经全部是文件夹了


// 单个打包，拆分
async function build(target) {
  console.log('打包' + target)
  // return execa('rollup', ['-c', '--environment', 'TARGET:'+target], {
  //   stdout: 'inherit'   // 表示子进程输出的结果会输出到父进程中
  // })
}

// 并行执行开启子进程
function runAll(targets) {
  let result = []
  for(let target of targets){
    result.push(build(target))
  }
  return Promise.all(result)
}

console.log(targets)
runAll(targets)
.then(() => {
  console.log('打包完成')
})
.catch(() => {
  console.log('打包异常！')
})
```



![image-20220302221735544](C:\Users\z\Documents\笔记\images\image-20220302221735544.png)



## 4、创建rollup.config.js文件

```javascript
const path = require("path");
const ts = require("rollup-plugin-typescript2");
const resolvePlugin = require("@rollup/plugin-node-resolve").default;

// 根据调用 rollup 命令的时候传入的环境变量 --environment .TARGET 获取到当前正在打的包名
let target = process.env.target;

// 1. 拼接入口文件地址
// 2. 动态声明 多个 output 配置
// 3. 添加其他配置信息 （插件信息）

let currentPath = path.join(__dirname, 'packages', target)

let packageJson = require(`${currentPath}/package.json`)
let buildOptions = packageJson.buildOptions

function genOutput(buildOptions) {
  let formats = buildOptions.formats || []
  return formats.map(format => {
    return {
      file: `${currentPath}/dist/${target}.${format}.js`,
      format: format,
      name: format === 'umd' ? buildOptions.name : undefined    // output umd 规范 一定要有名字
    }
  })
}

export default {
  input: `${currentPath}/src/index.ts`,
  output: genOutput(buildOptions),
  plugin: [
    ts({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
    }),
    resolvePlugin(),
  ],
};

```

子模块下面的 package.json 文件  `yarn init -y`

```json
{
  "name": "@vue/reactivity",
  "version": "1.0.0",
  "module": "dist/reactivity.es.js",
  "license": "MIT",
  "buildOptions": {
    "name": "VueReactivity",    // 包 umd 的下面对应的 window.VueReactivity 的名字
    "formats": [
      "es",   // es6 module
      "cjs",  // commonjs module
      "umd"   // umd  浏览器环境和 node 环境都支持
    ]
  },
  "dependencies": {   // 当前模块依赖的模块
    "@vue/shared": "1.0.0"
  }
}

```



























