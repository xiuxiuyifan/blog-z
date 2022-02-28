// 条件类型  就是可以在类型里可以写三元表达式

// ts 中有一个条件分发的概念， 联合类型才会发生条件分发

interface Bird {
  name: "鸟"; // 字面量类型
}
interface Fish {
  name: "鱼";
}
interface Sky {
  color: "蓝色";
}
interface Water {
  color: "白色";
}

type MyType<T> = T extends Bird ? Sky : Water; // 条件类型就是三元表达式

type MyBird = MyType<Fish | Bird>; // Water | Sky  只有联合类型才能进行分发操作，不是联合类型，没有分发的功能

// 一下要说的内容都是ts中自带的类型，咱们亲自实现一下

// Exclude 排除联合类型里面的类型
// 多的去少的里面找， 找到了就排除，返回剩下的
type Exclude<T, U> = T extends U ? never : T;
type x = Exclude<string | number | boolean, string>;

// Extract 提取提炼 , 多的去少的里面找，找到了就保留，就是提取

type Extract<T, U> = T extends U ? T : never;
type x1 = Extract<string | number | boolean, string>;

// Partial  部分的, 让属性都变成可选地

// 默认的只会让一层变成可选的
interface Ix {
  name: string;
}

type Partial<T> = {
  [K in keyof T]?: T[K]; // 循环 接口的 key 并取出值作为 value
};
type x2 = Partial<Ix>;

// 让所有属性都变成可选地，深层的也可以  递归

type deepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? deepPartial<T[K]> : T[K];
};

// 让对象的属性可以全部变成可选地

interface ICompany {
  name: string;
  address: string;
}

interface IPerson {
  name: string;
  age: number;
  company: ICompany;
}

type MyPartial = deepPartial<IPerson>;

let lili: MyPartial = {
  name: "丽丽",
  age: 10,
};

// 排除 null 和 undefined

let el = document.getElementById("app");
type NonNullable<T> = T extends null | undefined ? never : T;

type x3 = NonNullable<typeof el>;

console.log("hih");

// readonly 只读的

type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};
let a1: Readonly<ICompany> = {
  name: "daf",
  address: "fdasfa",
};

// required 必须的
interface Ir {
  name?: string;
}
type Required<T> = {
  [K in keyof T]-?: T[K];
};

let r: Required<Ir> = {
  name: "da",
};

// pick 挑选出结果出来
// 循环少的，并从多的里面取出结果
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type MyPerson = Pick<IPerson, "name" | "age">;

let m1: MyPerson = {
  name: "s",
  age: 10,
};

// omit 排除对象的属性

// 取出排除后的属性
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
//
type MyOmit = Omit<IPerson, "name" | "age">;

// record 记录 可以用来描述对象类型
// record<string, any>     <key, value>  对象的 key 和 value 的类型

// 实现一个 map 函数  实现思路， 先把 js 代码写出来， 再给 JS 代码加类型。

// 循环一个对象 ， 并且
// K 代表对象的 key 
// V 代表对象的 value
// U 代表 fn 函数的返回值
function map<K extends keyof any, V, U>(obj: Record<K, V>, fn: (item: V, key: K) => U): Record<K, U> {
  let result = {} as Record<K, U>;
  for (let key in obj) {
    result[key] = fn(obj[key], key);
  }
  return result;
}

let obj = map({name: '小明', age: 10}, function() {
  return 'asfdas'
})


export {};
