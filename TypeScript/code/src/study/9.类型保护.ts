// 类型推断 infer
// 获取函数返回值的类型
// 值是不能当做泛型来传递的  泛型必须是类型
// infer 必须配合 extends 关键字使用
// infer X 表示声明一个 X 的类型

function getPointer(x: string, y: string, z: string) {
  return { x, y, z };
}

//  ReturnType 获取函数返回值的类型

type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type x = ReturnType<typeof getPointer>;

// 推断函数参数的类型
// Parameters
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : any;
type x1 = Parameters<typeof getPointer>;

// 推断构造函数的类型
class Person {
  constructor(name: string, age: number, address: string) {}
}

type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : any;
type t1 = ConstructorParameters<typeof Person>;

// 推断实例的类型

type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
type t2 = InstanceType<typeof Person>;
let i: t2 = new Person("小明", 10, "中国");

// unknown

let a: unknown = { a: 10 };
a = 10;

// 尽量使用 unknown 来替换 any

type t3 = unknown & string; // 交集获得到的永远是其他类型

type t4 = unknown | string; //  联合类型永远是 unknown

type t5 = keyof unknown; //  不支持 keyof

type t6 = never extends unknown ? true : false; // never 是 unknown 的子类型

type union = { name: string } | { age: number };

// 用数组包裹
type NakeArray<T> = (T extends any ? Array<T> : never) extends Array<infer R> ? R : never;

type toSection = NakeArray<union>;

type NakeObj<T> = (T extends any ? { ar: T } : never) extends { ar: infer R } ? R : never;
type toSection2 = NakeObj<union>;

type NakeFnc<T> = (T extends any ? (a: T) => void : never) extends (a: infer R) => void ? R : never;
type toSection3 = NakeFnc<union>;

// 练习

//  求两个类型 的 差集

let person1 = {
  name: "zf",
  age: 12,
  address: "霍营",
};

let person2 = {
  // name | age | adress  name  先 exclude -> Omit / extract -> pick
  name: "jw",
};

type p1 = typeof person1;
type p2 = typeof person2;

// 从前者里面排除后者  多的属性里面排除少的属性
type Diff<T extends object, K extends object> = Omit<T, keyof K>;

type dp = Diff<p1, p2>;

// 求交集 是取两个类型中相同的类类型
type Inter<T extends object, K extends object> = Pick<T, Extract<keyof T, keyof K>>;
type MyInter = Inter<p1, p2>; // name

// 并集 （） T & K => 如果类型不一致 会出现错误 never

let person3 = {
  name: "zf",
  age: 12,
  address: "霍营",
};
let person4 = {
  name: "jw",
  age: "18",
};

type Person3 = typeof person3;
type Person4 = typeof person4;

// 在多的里面把少的(属性名字一样的)先去除掉， 然后在再 与少的求交集
type Merge<T extends object, K extends object> = Omit<T, keyof K> & K;

type c = Merge<Person3, Person4>;

type Compute<T> = { [K in keyof T]: T[K] }; // 拓展运算符    ， 可以展开 & 之后的结果，为了看的时候方便
type newP = Compute<c>;

type v = Person3 & Person4;
type v1 = Compute<v>;

// 覆盖  (后者的类型 覆盖掉前者的类型)
let person5 = {
  age: 12,
  address: "霍营",
};
let person6 = {
  name: "jw",
  age: "18",
};
// 6把5重写了 不是合并 -> {age:'string',adress:string}

type Person5 = typeof person5;
type Person6 = typeof person6;
// 先求两个类型的交集 交叉的部分 ， 和 另一个对象忽略交叉的部分 -》 在进行合并
type Overwrite<T extends object, K extends object> = Inter<K, T> & Omit<T, keyof K>;
type MyOverwrite = Compute<Overwrite<Person5, Person6>>;

let overwrite: MyOverwrite = {
  age: "18",
  address: "",
};

// 类型保护

interface Fish {
  kind: "鱼";
  swiming: string;
}
interface Bird {
  kind: "鸟";
  swiming: string;
}

// 检测类型
function isFish(x: Fish | Bird): x is Fish {      // 标识返回值得类型是 鱼
  return x.kind === "鱼";
}

function getVal(val: Fish | Bird) {
  if (isFish(val)) {
    val;
  } else {
    val;
  }
}





export {};
