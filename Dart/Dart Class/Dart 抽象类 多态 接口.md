# Dart 抽象类 多态 接口
---

	Dart抽象类：Dart抽象类主要用于定义标准，子类可以继承抽象类，也可以实现抽象类接口
	
	1. 抽象类通过abstract 关键字定义
	2. Dart中的抽象方法不能用abstract声明，Dart中没有方法体的方法我们称之为抽象方法
	3. 如果子类继承抽象类必须实现里面的抽象方法
	4. 如果把抽象类当作接口实现的话必须实现抽象类里面定义的所有属性和方法
	5. 抽象类不能被实例化，只能继承它的子类可以
	
	extends抽象类 和 implements的区别
	
	1. 如果要复用抽象类里面的方法，并且要用抽象方法约束自类的话，我们就使用extends继承抽象类
	2. 如果只是把抽象类当作标准的话，我们就是用implements实现抽象类
	
```dart
abstract class Anmial {
  // 抽象方法
  eat();
  // 普通方法
  getInfo() {
    print("普通方法");
  }
}

class Dog extends Anmial {
  // 子类必须有这个方法
  @override
  eat() {
    // TODO: implement eat
    print("eat");
  }
}

main() {
  // 抽象类自身不能实例化，子类才能实例化
  Dog d = new Dog();
  d.eat();
  d.getInfo();
}
```

	Dart中的多态
	
	- 允许将子类类型的指针赋值给父类类型的指针，同一个函数调用会有不同的执行结果
	- 子类的实例赋值给父类的引用
	- 多态就是父亲定义一个方法不去实现，让继承他的子类去实现，每个子类有不同的表现
	
```dart
abstract class Anmial {
  eat();
}

class Dog extends Anmial {
  @override
  eat() {
    print("Dog eat");
  }

  run() {
    print("run");
  }
}

class Cat extends Anmial {
  @override
  eat() {
    print("Cat eat");
  }

  run() {
    print("run");
  }
}

main() {
  Anmial d = new Dog(); // 只能获取Anmial类的方法
  d.eat();

  Anmial c = new Cat();
  c.eat();
}
```

	Dart中的接口
	
	- dart的接口没有interfance关键字定义，而是普通类或者抽象类都可以作为接口被实现
	- 使用implements关键字实现
	- dart的接口如果实现的类是普通类，就会将普通类和抽象类中的属性的方法全部覆写一遍
	- 因为抽象类可以定义抽象方法，而普通类不可以，所以一般如果要实现像Java接口那样的方式，一般会使用抽象类
	- 建议使用抽象类定义接口
	
```dart
// mysql mssql mongodb
// 接口<约定，规范>
abstract class Db {
  String url;
  add(Map data);
  save();
  delete();
}

// 实现接口
class Mysql implements Db {
  @override
  String url;

  Mysql(this.url);

  @override
  add(Map data) {
    // TODO: implement add
    print(data);
  }

  @override
  delete() {
    // TODO: implement delete
  }

  @override
  save() {
    // TODO: implement save
  }
}

main() {
  var obj = new Map();
  obj.addAll({"name": "allen", "age": 22});
  Mysql sql = new Mysql("localhost:8000");
  sql.add(obj);
}

```