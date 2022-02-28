// 手写一下 promise All

let p1 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve(1)
    }, 1000)
})
let p2 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve(2)
    }, 2000)
})
let p3 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        reject(3)
    }, 3000)
})

// 接受一个 promise 数组, 如果都成功了，就返回成功，如果有一个失败了就返回失败
Promise.prototype.all = function (promiseArr) {
  let result = [];
  let count = 0;
  let len = promiseArr.length;
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item, index) => {
      item
        .then((data) => {
          result[index] = data;
          count++;
          if (count === len) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

Promise.all([p1, p2, p3])
.then((data) => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})

// xxxxkey=en_USxxxbbb=zh_CD

// (?<=\w?*)key=[a-z]{2}_[A-Z]{2}