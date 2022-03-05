const path = require("path");
const ts = require("rollup-plugin-typescript2");
const resolvePlugin = require("@rollup/plugin-node-resolve").default;

// 根据调用 rollup 命令的时候传入的环境变量 --environment .TARGET 获取到当前正在打的包名
let target = process.env.target;

// 1. 拼接入口文件地址
// 2. 动态声明 多个 output 配置
// 3. 添加其他配置信息 （插件信息）


// output umd 规范 一定要有名字
let currentPath = path.join(__dirname, 'packages', target)

let packageJson = require(`${currentPath}/package.json`)
let buildOptions = packageJson.buildOptions

function genOutput(buildOptions) {
  let formats = buildOptions.formats || []
  return formats.map(format => {
    return {
      file: `${currentPath}/dist/${target}.${format}.js`,
      format: format,
      name: buildOptions.name
    }
  })
}

export default {
  input: `${currentPath}/src/index.ts`,
  output: genOutput(buildOptions),
  plugins: [
    ts({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
    }),
    resolvePlugin(),
  ],
};
