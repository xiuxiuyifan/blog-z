## 相同点

### 1、都可以描述一个对象或者函数

【interface】

```typescript
interface User {
    name: string,
    age: number
}

interface SetUser {
    (name: string, age: number) : void
}
```

【type】

```typescript
type User = {
    name: string,
    age: number
}

type SetUser = (name: string, age: number) => void
```



### 2、扩展（extends）与交叉类型(intersection types) 

1. **interface** 可以 **extends**，type 不允许 extends和implement的，type可以通过交叉类型实现 interface 的extends行为。
2. 并且两者并不是相互独立的，也就是说 interface 可以 **extends** type ， type也可以与 interface类型交叉。
3. 两者效果差不多，但是两者语法不同。

### interface extends interface 

```typescript
interface Name {
  name: string;
}
interface User extends Name {
  age: number;
}
```

### type & type

```typescript
type Name  = {
    name: string
}

type User = Name & {age: number}
```

### interface extends type

```typescript
type Name = {
    name: string
}

interface User extends Name {
    age: number
}
```

### type & interface

```typescript
interface Name {
    name: string
}

type User = Name & {
    age: number
}
```



## 不同点



### type 可以 interface 不行

### type 可以声明基本类别名，联合类型，元组类型

```typescript
type Name = string
```

```typescript
interface Dog {
  wong();
}
interface Cat {
  miao();
}

type Pet = Dog | Cat;

let a: Pet = {
  wong() {},
};
```

### 通过typeof获取实例的类型进行赋值

```typescript
let div = document.createElement('div')
type B = typeof div
```

### 其他骚操作

```typescript
type StringOrNumber = string | number;  

type Text = string | { text: string };  

type NameLookup = Dictionary<string, Person>; 


type Callback<T> = (data: T) => void;  

type Pair<T> = [T, T];  

type Coordinates = Pair<number>;  

type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```



### interface 可以 type不行

### interface 能够声明合并

```typescript
interface User{
    nage: string,
    age: number,
}
interface User{
    sex: string
}

let user: User = {
    nage: '小明',
    age: 10,
    sex: '男'
}
```

推荐：能用`interface`就用`interface`，实现不了再考虑用`type`