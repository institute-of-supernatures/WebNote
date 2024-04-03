# Dart 运算符
---

1. 算数运算符
	`+ - * / ~/(取整) %(取余)`
2. 关系运算符
	`== != > < >= <=`
3. 逻辑运算符
	`! && ||`
4. 赋值运算符
	- 基础运算符 `= ??=`
		- `??=` 表示左边的变量为空的话， 将右边的值赋值给左边的变量
	- 复合运算符 `+= -= *= /= %= ~/=`

# 条件判断 
---

1. if语句
2. if-else语句
3. if-elseif-else语句
4. switch case语句
5. 三目运算语句
6. ??运算符（判断值是否为空，为空执行右边的值）

```dart
main() {

  var a;
  var b = a ?? 10;
  print(b); // 10
   
}
```

# 类型转换
---

1. Number 与 String
	- int.parse();
	- double.parse();
	- toString();

```dart
main() {
 
  // String --> Number
  String str = '123';
  var num1 = int.parse(str);
  print(num1 is int); // true
  
  String str1 = '123.321';
  var num2 = double.parse(str1);
  print(num2 is double); // true 
  
  String price = '';
  var num0;
  try {
    num0 = double.parse(price);
    print(num0);
  } catch (e) {
    num0 = 0;
    print(num0);
  }
  
  // Number --> String
  var num3 = 123;
  String str2 = num3.toString();
  print(str2 is String); // true
  
}
```

2. 其他类型 与 Booleans
	- isEmpty 判断字符串是否为空
	- isNaN 判断值是否为NaN

```dart
main() {

  var str = 'xxx';
  if(str.isEmpty) {
    print("str is empty");
  }else{
    print("str is not empty "); 
  }
  
}
```