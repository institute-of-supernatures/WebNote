# Vue

## 单页面应用的优缺点（SPA）

> 优点
>
> 1. 良好的交互体验。单页应用的内容的改变不需要重新加载整个页面，获取数据也是通过Ajax异步获取，没有页面之间的切换，就不会出现“白屏现象”,也不会出现假死并有“闪烁”现象，页面显示流畅
> 2. 良好的前后端工作分离模式。后端不再负责模板渲染、输出页面工作，后端API通用化，即同一套后端程序代码，不用修改就可以用于Web界面、手机、平板等多种客户端
> 3. 减轻服务器压力.单页应用相对服务器压力小，服务器只用出数据就可以，不用管展示逻辑和页面合成，吞吐能力会提高几倍

> 缺点
> 1. 首屏加载慢。vue-router懒加载、使用CDN加速、异步加载组件、服务端渲染
> 2. 不利于SEO。页面预渲染、路由采用h5 history模式

## Vue双向绑定的原理

```javascript
// todo: Vue2
const Book = {}
Object.defineProperty(Book, {
  get () {},
  set (value) {}
})
```

```javascript
// todo: Vue3
const Book = {}
new Proxy(Book, {
  get () {},
  set (value) {}
})
```

## 什么是Vue的数据响应式

> 数据变化时，依赖数据的函数重新运行

```javascript
render(() => this.name, this.age)
watch(() => this.name, () => {})
computed(() => this.name + this.age)
atchEffect(() => this.name)
```

## Vue2与Vue3的生命周期

> 对于生命周期来说，整体上变化不大

| Vue2          | Vue3            | 说明                                                   |
| ------------- | --------------- | ------------------------------------------------------ |
| beforeCreate  | setup           | 组件创建之前，执行初始化任务                           |
| created       | setup           | 组件创建完成，访问数据、获取数据接口                   |
| beforeMount   | onBeforeMount   | 组件挂载之前                                           |
| mounted       | onMounted       | 组件挂载完成，DOM以创建，访问数据或DOM元素，访问子组件 |
| beforeUpdate  | onBeforeUpdate  | 未更新，获取更新前所有状态                             |
| updated       | onUpdated       | 组件挂载完成，DOM以创建，访问数据或DOM元素，访问子组件 |
| beforeDestroy | onBeforeUnmount | 未销毁，获取销毁前所有状态                             |
| destoryed     | onUnmounted     | 组件销毁之后                                           |

## setup函数

- `setup`函数式Vue3特有的选项，作为组合式API的起点
- 从组件生命周期看，它在`beforeCreate`之前执行
- 函数中`this`不是组件实例，是`undefined`
- 如果数据或函数在模板中使用，需要在`setup`返回

## 组合式api

- Vue2是`选项API（Options API）`，逻辑会散落在文件不同位置`<data、props、computed、watch、生命周期狗子等>`，导致代码可读性变差。
- Vue3`组合式API（Composition API）`则很好的解决了这个问题，可以将统一逻辑的内容写到一起，增强了代码可读性、内聚性，还提供了较为完善的复用性方案。在`setup`函数中，使用`ref、watch`等函数组织代码。

## 响应式原理

> 【Vue2.x】响应式原理是利用es5的`Object.defineProperty()`对数据进行劫持结合`发布订阅模式`来实现
>
> 【Vue3.x】响应式原理是利用es6的`proxy`对数据代理，通过`reactive()`函数对每一个对象都包一层`proxy`，通过proxy监听属性的变化，从而实现对数据的监控

**Object.defineProperty的缺陷**

只有实例创建时data中有的数据实例创建后才是响应式的，给已创建好的的Vue实例data对象中添加属性时，数据虽然会更新，但视图不会更新，不具有响应式。

- `对象新增、删除属性是没有响应式`
- `数组新增、删除元素没有响应式`
- `通过下标修改某个元素没有响应式`
- `通过 .length改变数组长度没有响应式`

**proxy的优势**

- `proxy`性能整体上优于`Object.defineProperty`
- `Vue3支持更多数据类型的劫持`（Vue2只支持Object、Array，Vue3支持Object、Array、Map、WeakMap、Set、WeakSet）
- `Vue3支持更多时机来进行依赖收集和触发通知`（vue2只在get时进行依赖收集，vue3在get/has/iterate时进行依赖收集；vue2只在set时触发通知，vue3在set/add/delete/clear时触发通知）`所以vue2中的响应式缺陷vue3可以实现`
- `vue3做到了“精准数据”的数据劫持`（vue2会把整个data进行递归数据劫持，而vue3只有在用到某个对象时，才进行数据劫持，所以响应式更快并且占内存更小）
- `vue3的依赖收集器更容易维护`（vue3监听和操作的是原生数组；vue2是通过重写的方法实现对数组的监控）


### 核心 diff 算法区别

> 【Vue 2.x】使用的是`双向指针遍历的算法`，也就是通过逐层比对新旧虚拟DOM树节点的方式来计算出更新需要做的最小操作集合。但这种算法的缺点是，`由于遍历是从左到右、从上到下进行的，当发生节点删除或移动时，会导致其它节点位置的计算出现错误，因此会造成大量无效的重新渲染`。
>
> 【Vue 3.x】使用了经过优化的`单向遍历算法`，也就是只扫描新虚拟DOM树上的节点，判断是否需要更新，跳过不需要更新的节点，进一步减少了不必要的操作。此外，在虚拟DOM创建后，Vue 3会缓存虚拟DOM节点的描述信息，以便于复用，这也会带来性能上的优势。同时，Vue 3还引入了`静态提升技术`，在编译时将一些静态的节点及其子节点预先处理成HTML字符串，大大提升了渲染性能。

## vue2组件通信的12种方式

1. 使用 `props` 进行父子组件之间的数据传递
2. 使用 `.sync` 和 `update` 进行父子组件之间的数据传递/修改
3. 使用 `v-model` 进行双向数据绑定
4. 使用 `$ref` 获取子组件实例
5. 使用 `$emit` 和 `$on` 进行父子组件之间的通信
6. 使用 `$attrs` 或 `$listeners` 进行父子组件之间的通信
7. 使用 `$children` 获取子组件数组、使用 `$parent` 获取父组件实例
8. 使用 `provide` 和 `inject` 为依赖注入
9. 使用 `EventBus` 中央事件总线
10. 使用 `$store` 访问 `Vuex store` 中的状态和 mutations
11. 使用 `$root` 获取 App.vue 里的数据和方法
12. 使用 `$slot` 插入默认插槽或自定义插槽
13. 使用 `$route` 访问 Vue Router 中的路由信息

## Vue中不用index作为key

1. 会导致性能损耗
   1. 虚拟 DOM 需要先比较再替换，如果 key 相同，则直接替换，如果 key 不同，则需要先删除再创建 `<数组的reverse>`
2. 会导致状态不可控
   1. 比如删除后，索引为 0 的节点，其 key 还是 0，所以会复用，导致状态不可控 `<数组的子项删除>`

## vue3多个根标签

1. Vue3中使用了 `Fragment` 标签或者空标签
   - 如果存在多个根节点
   - vue就会把它的虚拟结点类型创建为Fragment
   - 在调用render方法的时候，会对Fragment类型做一个另外的处理
   - 去判断旧的结点，如果旧的结点是null，那么他就会把新虚拟节点里的children放入挂载
   - 如果旧的结点存在，他就会去对比旧结点的children，走diff算法去更新/挂载
   - vue2 可以通过 `vue-fragment` 实现
2. 因为 vue3 使用了 `Proxy` 代理组件`<指的是可以在组件内通过this访问到setup暴露出去的属性，或者是一些特殊变量>`，所以可以有多个根标签
3. vue3中可以使用 `Teleport` 多层穿透挂载

## 路由守卫

> 全局守卫
>
> - beforeEach
>   - 在路由跳转前触发，参数包括to,from,next（参数会单独介绍）三个，这个钩子作用主要是用于登录验证，也就是路由还没跳转提前告知，以免跳转了再通知就为时已晚。
> - beforeResolve
>   - 这个钩子和beforeEach类似，也是路由跳转前触发，参数也是to,from,next三个，和beforeEach区别官方解释为：
>   - 区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。即在 beforeEach 和 组件内beforeRouteEnter 之后，afterEach之前调用。
> - afterEach
>   - 和beforeEach相反，他是在路由跳转完成后触发，参数包括to,from没有了next（参数会单独介绍）,他发生在beforeEach和beforeResolve之后，beforeRouteEnter（组件内守卫）之前。

> 组件级
>
> - beforeRouteEnter
>   - 在渲染该组件的对应路由被 confirm 前调用
>   - 不！能！获取组件实例 `this`，因为当守卫执行前，组件实例还没被创建
> - beforeRouteUpdate
>   - 在当前路由改变，但是该组件被复用时调用，举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
>   - 可以访问组件实例 `this`
> - beforeRouteLeave
>   - 导航离开该组件的对应路由时调用
>   - 可以访问组件实例 `this`

## 作用域插槽

> - 具名插槽，在渲染父组件的时会编译插槽节点，在后续创建子组件时，将对应的 slot 节点替换为父组件的 VNode（插槽的作用域为父组件，插槽中内容显示由父组件来决定）
```html
<!-- myHeader -->
<template>
  <div>
    <slot name="custom"></slot>
  </div>
</template>

<!-- 父组件 -->
<template>
  <my-header>
    <template v-slot:custom></template>
  </my-header>
</template>
```

> - 作用域插槽在渲染父组件时会将插槽解析成函数，当子组件渲染时，会调用此函数进行渲染。（插槽的作用域为子组件）
```html
<!-- myList -->
<template>
  <ul>
    <slot name="item" v-for="item in items" :item="item" :key="item.id"></slot>
  </ul>
</template>

<!-- 父组件 -->
<template>
  <my-list :items="listItems">
    <template v-slot:item="{ item }">
      <li>{{ item.name }}</li>
    </template>
  </my-list>
</template>
```

- 具名插槽和作用域插槽的主要区别在于它们数据传递的方式不同，具名插槽只能传递静态数据，而作用域插槽可以传递动态数据。

## Vue优化

- 使用Vuex缓存数据
- 合理使用watch和computed，数据变化就会执行，避免使用太多，减少不必要的开销
- 使用路由懒加载，在需要的时候才会进行加载，避免一次性加载太多路由，导致页面阻塞
- 合理使用mixins，抽离公共代码封装成模块，避免重复代码
- 使用冻结对象 `冻结对象不会被响应式 Object.freeze`
- 函数式组件 `没有实例，没有生命周期，没有 this 上下文，没有 $el`
- 使用异步组件，避免一次性加载太多组件
- 非实时绑定表单项 `v-model.lazy > change事件`
- 合理使用v-show & v-if
- 延迟装载 defer `requestAnimationFrame`
- 使用keep-alive缓存组件，避免组件重复加载
- 避免使用v-html，存在安全问风险和性能问题，可以使用v-text