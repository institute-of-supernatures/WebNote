# Css
---

## css变量

1. css直接定义

```css
--data-color: #333;

.h1 {
	color: var(--data-color)
}
```

2. Dom元素定义

```vue
<template>
	<span :style="{'--data-color': color}"></span>
</template>

<script>
	data(){
		return {
			color: '#333'
		}
	}
</script>

<style>
	.span {
		color: var(--data-color)
	}
</style>
```

## css获取自定义data

```html
<span data-before="12"></span>

<style>
.span:before {
	content: attr(data-before);
}
</style>
```