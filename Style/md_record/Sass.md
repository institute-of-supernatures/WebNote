# Sass
---

## if语句

```scss
$data-color: "#fff";
$data-num: 2;

.main {
	@if($data-num == 2){
		color: $data-color;
	}
	@else{
		color: #333;
	}
}
```