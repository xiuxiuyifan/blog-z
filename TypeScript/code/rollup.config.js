import path from "path";
import ts from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

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