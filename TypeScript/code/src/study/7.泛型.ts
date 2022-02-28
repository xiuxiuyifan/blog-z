// 编写一个工厂函数， 可以根据传入的构造函数返回创建出来的对象

// 定义一个类型接受一个构造函数， 返回实例对象
type MyType<T> = new (name: string, age: number) => T;

class Cat {
  constructor(public name: string, public age: number) {}
}

class Dog {
  constructor(public name: string, public age: number) {}
}

// 函数接受的参数类型不确定时，就要传泛型
function createInstance<T>(clazz: MyType<T>, name: string, age: number) {
  return new clazz(name, age);
}

let r = createInstance(Cat, "小黑", 10);

interface ICreateArray {
  // 泛型定义在外面 表示使用类型的时候确定类型
  <T>(times: number, item: T): T[]; // 写在里面 表示在执行的时候确定类型
}

// 我希望产生一个数组 ： 给数组长度和内容 -> 数组的结果

function createArray<T>(times: number, item: T): T[] {
  let result = [];
  for (let i = 0; i < times; i++) {
    result.push(item);
  }
  return result;
}

let a = createArray(3, "sfs");

// 实现一个forEach方法 能进行数组的循环

interface IFn<T> {
  (item: T, index: number): void;
}

let foreach = <T>(arr: T[], fn: IFn<T>) => {
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i], i);
  }
};
foreach([1, 2, 3, 4], (item) => {
  console.log(item);
});

// 泛型约束，类型的兼容性，高级类型（条件），内置类型， 自定义类型
// 可以限制泛型的范围 -》 泛型约束
// 约束不代表等于 只是有string的特性，不能说string 和 T 就是一个东西

// 我们期望在一个对象中能获取对象中的属性

function getVal<T extends object, K extends keyof T>(val: T, key: K) {}

type r1 = keyof string; // 联合类型，并集

type r2 = keyof any; // string | number | symbol  都能作为key就是这三个属性

// 交叉类型 表示两个人共有的部分, 所有的都要
interface A {
  handsome: string;
  type: number;
}

interface B {
  high: string;
  type: string;   
}

type AB = A & B;

let person: AB = {
  handsome: "fafa",
  high: "2342",
  type: "afsa" as never,   // type string 和 number 交出来就是 never 了
};

// 两个对象 我想做一个合并

function mixin<T extends object, K extends object>(o1: T, o2: K) {
  return { ...o1, ...o2 };
}

let x1 = mixin({ a: 1 }, { a: "212", b: 2, c: 3 });
console.log(x1.a)

export {};
