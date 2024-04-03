# Dart 变量 常量 命名规则
---

> main 主方法

```dart
// 普通定义
//main() {
//
//}

// 没有返回值定义主方法
void main() {

}
```

> 注释

```dart
// 注释1

/*
  注释2
*/

/// 注释3
```

> 变量

1. dart可以不预先定义变量类型
2. 可通过var关键字声明变量， 使用了var不可在定义类型
3. 注意定义的变量类型与赋值的变量类型需要一致（var/预先定义  同理）

```dart
main() {
	var age = 23;
	String name = "AllenXD";
	int year = 1997;
	
	String str = 123; // 报错
	int num = '123'; // 报错
	var month = '';
	month = 6; // 报错
}
```

> 常量

1. const
	1. 值不变，定义时赋值
2. final
	1. 定义时可不赋值，只能赋值一次
	2. 运行时常量，即运行时第一次使用前才初始化

```dart
main() {
	const PI = 3.1415926;
	// PI = 3.14; 报错
	print(PI);

	
	final PAI = 3.1415926;
	// PAI = 3.14; 报错
	print(PAI);
 	final time1 = new DateTime.now();
 	// const time2 = new DateTime.now(); 报错
 	print(time1); // 当前时间
}
```

> 命名规则

- 变量名称必须由数字、字母、下划线和美元符号组成。
- 注意：标识符开头不能是数字
- 标识符不能是保留字和关键字
- 变量名称区分大小写：age和Age不是同一个变量
- 标识符一定要见名思意