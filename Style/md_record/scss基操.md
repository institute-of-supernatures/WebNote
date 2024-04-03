# scss 基操

## `@each`

    循环操作方法

```scss
// 定义变量
$data: (
  'red': #EB5550,
  'green': #32C3A5,
  'yellow': #F59B14,
  'skyBlue': #14B4F5
);
@each $key, $value in $data {
  // 使用变量key作为名称
  .#{$key} {
    color: $value;
  }
}
```

## `#{}`

    变量拼接

```scss
// 定义变量
$data: (
  'pic': '~@/assets/h5_build/ic_pic_',
  'video': '~@/assets/h5_build/ic_video_',
  'txt': '~@/assets/h5_build/ic_txt_',
  'form': '~@/assets/h5_build/ic_form_',
  'btn': '~@/assets/h5_build/ic_btn_',
  'blank': '~@/assets/h5_build/ic_blank_'
);

.img__ic {
  @each $key, $url in $data {
    &__#{$key} {
      background: url('#{$url}normal@2x.png');
    }
  }

  &:hover {
    @each $key, $url in $data {
    &__#{$key} {
      background: url('#{$url}hover@2x.png');
    }
  }
  }
}
```

## `@mixin`

    混淆样式

```scss
// 定义混淆 -- 无参数
@mixin user-select {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
// 定义混淆 -- 有参数 默认值可选择性配置
@mixin radiu($index: 50%) {
  -webkit-border-radius: $index;
  -moz-border-radius: $index;
  border-radius: $index;
}

// 使用
h1 {
  @include user-select;
}
.box {
  // @include radiu; 不传参默认 50%
  @include radiu(20px);
}
```

## `%` & `@extend`

    样式继承

```scss
// 定义占位样式 只有当@extend调用时才生效
%border-style {
  border:1px solid #aaa;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

.container {
  // 使用继承
  @extend %border-style;
  color: 'red';
}
.container-1 {
  // 继承另一个选择器
  @extend .container;
}
```

## 嵌套写法

- 我们最常用的就是元素类名的嵌套写法

- 嵌套属性
```scss
// 经典案例 -- 画三角形(多属性的其他样式同理)
.arraw-common {
  display: block;
  width: 0;
  height: 0;
  border-right: 0;
  border-top: 0;
  border-bottom: 40px solid #eee;
  border-left: 40px solid transparent;
}
.arraw-nest {
  display: block;
  width: 0;
  height: 0;
  border: 40px solid #eee {
    top: 0;
    right: 0;
    left-color: transparent;
  };
}
```

## `@at-root`

    放弃嵌套

```scss
.header {
  width: 100px;
  @at-root &__button {
    background: red;
    @at-root &--primary {
      color: white;
    }
  }
}
// 等价于
.header {
  width: 100px;
}
.header__button {
  background: red;
}
.header__button--primary {
  color: white;
}
```
```scss
// 与#{}结合
.foo {
  @at-root .bar #{&} {
    color: gray;
  }
}
// 等价于
.bar .foo {
  color: gray;
}
```
```scss
.foo {
  @at-root #{&} .bar {
    color: gray;
  }
}
// 等价于
.foo .bar {
  color: gray;
}
```
```scss
.foo {
  @at-root #{&}.bar {
    color: gray;
  }
}
// 等价于
.foo.bar {
  color: gray;
}
```
```scss
@mixin utils-clearfix {
  $selector: &;

  @at-root {
    #{$selector}::before,
    #{$selector}::after {
      display: table;
      content: "";
    }
    #{$selector}::after {
      clear: both;
    }
  }
}
.box {
  @include utils-clearfix;
}
```