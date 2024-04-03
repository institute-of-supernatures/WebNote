# Dart 静态成员 方法
--- 

	Dart中的静态成员
	
1. 使用`static`关键字来实现类级别的变量和函数
2. 静态方法不能访问非静态成员，非静态方法可以访问静态成员

```dart
class Person {
  static String name = "张三";
  int age = 22;
  static void show() {
    print(name);
  }

  void showInfo() {
    // print(name);
    show();
    print(this.age);
  }
}

main() {
  print(Person.name); // 张三
  Person.show(); // 张三
  var p = new Person();
  p.showInfo(); // 张三 22
}
```