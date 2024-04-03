# Dart 数据类型
---

1. Number
	- int
	- double

```dart
main() {

  int num1 = 10;
  double num2 = 10.56;
    
}
```

2. String

```dart
main() {

  // '''和"""相当于js中的反引号`
  String name1 = '''name
  
  	Allen''';
	
  String name2 = """name
  
  	Aimer""";
  
  String hellow = "Hellow";
  String name = "Allen";
  // 字符串拼接
  print("$hellow $name"); // HellowAllen
  print(hellow+" "+name); // Hellow Allen
	
}
```

3. Boolean
	- bool

```dart
main() {

  bool bol = true;
  
  // if判断只存在==，值与类型都相同才为true
  if(bol){
    print(true);
  }else{
    print(false);
  }
  
}
```

4. List
	- 在Dart中，数组是列表对象，所以大多数人只是称它们为列表

```dart
main() {

  List arr = ['1', '2', '3'];
  
  print(arr.length); // 3
  print(arr[1]); // '2'
  
  var array = new List();
  array.add('aaa');
  array.add('bbb');
  array.add('ccc');
  print(array); // ['aaa', 'bbb', 'ccc'];
  
  // 指定list内部的类型，此时list只能存入相应的类型
  var arrStr = new List<String>();
  
}
```

5. Maps
	- 通常来说，Map是一个键值对相关的对象。键和值可以是任何类型的对象。每一个键

```dart
main() {
	
  // key必须加上引号
  var person = {
    "name": "Allen",
	"age": 23,
	"wifi": ["aimer", "gakki"]
  }
  print(person["name"]); // Allen
  
  var homen = new Map();
  homen["name"] = "aimer";
  homen["age"] = 22;
  homen["laog"] = ["allen "]
  
}
```

6. Runes
	- Rune是UTF-32编码的字符串，它可以通过文字转换成符号表情或代表特定的文字

```dart
main() {
  var clapping = '\u{1f44f}';
  print(clapping); // 👏
  print(clapping.codeUnits); // [55357, 56399]
  print(clapping.runes.toList()); // [128079]

  Runes input = new Runes('\u2665 \u{1f605} \u{1f60e} \u{1f47b} \u{1f44d}');
  print(new String.fromCharCodes(input)); // ♥ 😅 😎 👻 👍
}
```

7. Symbols
	- Symbol对象表示在Dart程序中声明的运算符或标识符。

## 类型判断

> 关键词 is

```dart
main() {
 
 var str = '1';
 
 if(str is String) {
   print("str is String");
 }else if(str is int){
   print("str is int");
 }else{
   print("other")
 }
 
}
```