<template>
  <div>hello world</div>
  <div>{{ userStore.name }}</div>
  <div>{{ name1 }}</div>
  <div>{{ name }}</div>

  <div>{{ userStore.fullName }}</div>

  <button @click="handleLogin">login</button>

  <div>code：{{ appStore.code }}</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { effect, reactive, ref, computed } from "vue";
import { useUserStore } from "./store/user";
import { useAppStore } from "./store/app";

const userStore = useUserStore();

userStore.$subscribe(() => {}, { detached: true });

const appStore = useAppStore();

const name1 = computed(() => userStore.name);

const { name } = storeToRefs(userStore);

const handleLogin = () => {
  appStore.login();
};

// userStore.updateName("李四");

// name.value = "李四";

// 1. 普通的 effect 函数

// const a = ref(1)

// effect(() => {
//   console.log(a.value)
// })

// a.value = 2

// 2. effect 的返回值 runner 函数允许你在合适的时机去动手执行 effect 的回调，
//    如果传入的函数有返回值，将在 runner 执行的时候返回对应的返回值

// let a = null
// let run = false

// const obj = reactive({
//   props: 'value'
// })

// const runner = effect(() => {
//   a = run ? obj.props : 'other'
// })

// runner()
// console.log(a)   // other

// run = true
// runner()
// console.log(a)  // value

// 3. lazy  懒执行 effect 函数  runner 调用之后才会触发 effect 的执行

// const obj = reactive({foo:1})
// let a = null;
// const runner = effect( () => ( a = obj.foo), {
//   lazy: true
// } )
// console.log(a) // null
// let r = runner() // 1  注意，如果回调函数有返回值，则 runner 函数的返回值与回调函数的返回值相同
// // console.log(r)  // 1
// obj.foo = 2
// console.log(a) //2
// obj.foo = 3
// console.log(a)

// 4. scheduler 参数 只有手动执行 runner 函数才会执行 effect 的回调函数
// let run: any, dummy

// const scheduler = () => {
//   run = runner
// }
// const obj = reactive({ foo: 1 })

// const runner = effect(
//   () => {
//     dummy = obj.foo
//   },
//   { scheduler }
// )

// console.log(dummy) // 1
// // scheduler 将在这里首次被调用
// obj.foo++

// console.log(dummy) // 1 注意此时的值没有更新

// run() // 手动调用 run , 在这里调用 runner 也能达到同样的效果, 因为他们两个是同一个函数 使用 scheduler 方式可以使你的逻辑分离，使 runner 可以传播，已进行数据的更新

// console.log(dummy) // 2 此时值更新了

// let runner = effect(() => {
//   console.log('hiihi')
// })

// function a() {
//   return "a";
// }
// function b() {
//   return "b";
// }

// function c() {
//   return "c";
// }
// function d() {
//   a();
//   b();
//   c();
//   return "d";
// }
// var ret = d();
</script>
