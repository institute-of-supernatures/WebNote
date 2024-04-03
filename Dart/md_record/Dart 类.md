# Dart 类
---

	Dart也是一门面向对象的语言，所有的对象都继承自Object类，即所有的对象都是类的实例，并且所有的类都是Object的子类，由属性和方法组成。
	
	面向对象编程（OOP）的三个基本特征：封装、继承、多态
	- 封装： 封装是对象和类概念的主要特征
	- 继承：面向对象编程语言的一个主要功能就是“继承”
	- 多态：允许子类类型的指针赋值给父类类型的指针，同一个函数调用会🈶️不同的执行效果
	
> 外部class文件通过import引入
> `import 'lib/Person.dart';`

```dart
// 自定义类，首字母大写
class Person {
  String name = "Allen";
  int age = 22;

  void getInfo() {
    // print("$name -- $age");
    print("${this.name} -- ${this.age}");
  }

  void setinfo(int age) {
    this.age = age;
  }
}

main() {
  // 实例化
  // var p1 = new Person();
  Person p1 = new Person();
  print(p1.name); // Allen
  p1.getInfo(); // Allen -- 22
  p1.setinfo(18);
  p1.getInfo(); // Allen -- 18
}

```

	构造函数

```dart
class Person {
  String name;
  int age;

  // 构造函数，实例化时自动触发
  // Person(String name, int age) {
  //   this.name = name;
  //   this.age = age;
  //   print("实例化完成");
  // }
  // 简写
  Person(this.name, this.age) {
    print("实例化完成");
  }

  void getInfo() {
    print("${this.name} -- ${this.age}");
  }

  void setinfo(int age) {
    this.age = age;
  }
}

main() {
  // 实例化
  Person p1 = new Person("Allen", 22); // 实例化完成
  p1.getInfo(); // Allen -- 22
}

```

	匿名构造函数
	
```dart
class Person {
  String name;
  int age;
  Person(this.name, this.age);

  // 匿名构造函数
  Person.now() {
    print("匿名构造函数");
  }

  Person.setInfo(this.name, this.age);

  void getInfo() {
    print("${this.name} -- ${this.age}");
  }
}

main() {
  // var d = new DateTime.now();
  // Person p1 = new Person("Allen", 22);
  Person p1 = new Person.now(); // 匿名构造函数
  Person p2 = new Person.setInfo("aimer", 30);
  p2.getInfo(); // aimer -- 30
}
```

> 定义私有属性或者方法需要单独抽离文件并且使用`_`开头定义
> 私有属性/方法可通过公有方法访问

	getter & setter
	
```dart
class Rect {
  num height;
  num width;

  Rect(this.height, this.width);

  get area {
    return this.height * this.width;
  }

  set setheight(vl) {
    this.height = vl;
  }
}

main() {
  Rect rec = new Rect(20, 20);
  rec.setheight = 10;
  print("面积： ${rec.area}");
}

```

> 初始化实例赋值

```dart
class Rect {
  num height;
  num width;

  Rect():height=10,width=10{
  };

  get area {
    return this.height * this.width;
  }

}

main() {
  Rect rec = new Rect();
  print("面积： ${rec.area}");
}
```

![[Dart/Dart Class/Dart 静态成员 方法]]

![[Dart/Dart Class/Dart 类的继承]]

![[Dart/Dart Class/Dart 复写父类方法]]

![[Dart/Dart Class/Dart 抽象类 多态 接口]]

![[Dart/Dart Class/Dart 多接口 Mixins]]
