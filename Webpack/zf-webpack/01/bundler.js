const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

function stepOne(filename) {
  // 读取文件
  const content = fs.readFileSync(path.resolve(__dirname, filename), "utf8");

  // 解析文件成ast
  const ast = parser.parse(content, {
    sourceType: "module",
  });

  const dependencies = {};

  // 遍历ast 语法树
  traverse(ast, {
    // 获取通过 import 导入的模块
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename);
      console.log(node.source.value);
    },
  });
}

stepOne("index.js");
