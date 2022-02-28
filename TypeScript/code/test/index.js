const fs = require("fs/promises");
const path = require("path");

const dirTree = {
  a: 1,
  b: {
    c: 3,
    d: 4,
  },
  e: {
    f: 5
  }
};

let dirArr = [];

// 根据对象生成目录，并创建文件
async function createFile(dirTree, paths = []) {
  if (typeof dirTree === "object") {
    for (let key in dirTree) {
      paths.push(key);
      let val = dirTree[key];
      createFile(val, paths);
      paths.pop();
    }
  } else {
    let url = path.resolve(__dirname, ...[...paths, dirTree + ""]);
    await fs.mkdir(url, { recursive: true });
    return;
  }
}

createFile(dirTree);
