# Css

## 0.5px线的多种实现方式

- transform scale
  ```html
  <style>
  .border {
    border: 1px solid #000;
    transform: scale(0.5);
    transform-origin: 50% 100%; /*为了防止线模糊*/
  }
  </style>
  ```

- svg line
  ```html
  <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='1px'>
    <line x1='0' y1='0' x2='100%' y2='0' stroke='#000'></line>
  </svg>
  ```

- box-shadow阴影
  ```html
  <style>
    .boder {
      box-shadow: 0px 0px 0px 0.5px green;
    }
  </style>
  ```

- ::after定位伪类
  ```html
  <style>
    .border::after {
      height: 0.5px;
      background-color: #000;
    }
  </style>
  ```

- border-image: linear-gradient 边框线性渐变
  ```html
  <style>
    .border::after {
      height: 1px;
      background-color: #000;
      background: linear-gradient(to bottom, transparent 50%, #000 50%);
    }
  </style>
  ```

## C3重排/重绘

> C3改变属性不会发生重排的属性
>
> background、border、color、cursor、opacity、pointerEvents、textDecoration、textTransform、transform、visibility、zIndex

## 垂直居中的布局方式

- inline-block + table-cell
  ```html
  <style>
    .parent {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
    }
    .child {
      display: inline-block;
    }
  </style>
  ```

- 同宽高 + padding
  ```html
  <style>
    *{margin: 0; padding: 0;}
    .parent{
      width: 100px;
      height: 100px;
      /*将padding设置，来挤出来居中的样子；
        但是要注意的是，此时的width和height要和子元素的大小一样，否则还是不居中*/
      padding: 100px;
      border: 1px solid;
      margin: 100px auto;
    }
    .child{
      width: 100px;
      height: 100px;
      background: pink;
      line-height: 100px;
      text-align: center;
    }
  </style>
  ```

- absolute + margin:auto
  ```html
  <style>
    *{margin: 0;padding: 0;}
    .parent{
      position: relative;
      width: 200px;
      height: 200px;
      /*padding: 100px;*/
      border: 1px solid;
      margin: 100px auto;
    }
    .child{
      position: absolute;
      /*left+right+width+padding+margin=包含块的宽度*/
        /*0 0 100 0 auto =300*/
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 100px;
      height: 100px;
      background: pink;
      line-height: 100px;
      text-align: center;
    }
  </style>
  ```

- absolute + 负margin（或transform）
  ```html
  <style>
    .parent{
      position: relative;
      width: 200px;
      height: 200px;
      border: 1px solid;
    }
    .child{
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -50px;
      margin-top: -50px;
      width: 100px;
      height: 100px;
      background: pink;
      line-height: 100px;
      text-align: center;
    }
  </style>
  ```

- grid布局
  ```html
  <style>
    .parent{
      display: grid;
    }
    .child{
      align-self: center;
      justify-self: center;
    }
  </style>
  ```

- flex布局
  ```html
  <style>
    .parent{
      disflay: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
  ```

- flex + margin
  ```html
  <style>
    .parent{
      disflay: flex;
    }
    .child{
      margin: auto;
    }
  </style>
  ```

- 文字元素的垂直水平居中 设置行高和text-align
  ```html
  <style>
    line-height: 50px;
    text-align: center;
  </style>
  ```

## CSS3新特性

- 伪类选择器、伪元素选择器
- border-radius
- box-shadow
- 线性渐变和径向渐变
- transition
- transform
- @keyframes
- @font-face
- Flexbox
- 媒体查询
- 网格布局
- 过滤效果 filter