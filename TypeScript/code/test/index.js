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


from: en
to: zh
query: equal
transtype: realtime
simple_means_flag: 3
sign: 337501.116076
token: 6b7da1c1ad9f059bc69ac4033bb7641d
domain: common

from: en
to: zh
query: has
transtype: realtime
simple_means_flag: 3
sign: 234035.487682
token: 6b7da1c1ad9f059bc69ac4033bb7641d
domain: common
