# Dart 多接口 Mixins
---

```dart
abstract class A {
  printA();
}

abstract class B {
  printB();
}

class C implements A, B {
  @override
  printA() {
    // TODO: implement printA
    print("A");
  }

  @override
  printB() {
    // TODO: implement printB
    print("b");
  }
}

main() {
  var c = new C();
  c.printA();
  c.printB();
}
```

	mixins
	
	1. 作为mixins的类只能继承自Object，不能继承其他类
	2. 作为mixins的类不能有构造函数
	3. 一个类可以mixins多个mixins类
	4. mixins绝不是继承，也不是接口，而是一种全新的特征
	
```dart
class A {
  printA() {
    print("A");
  }
}

class B {
  printB() {
    print("B");
  }
}

class C with A, B {}

main() {
  var c = new C();
  c.printA();
  c.printB();
}
```