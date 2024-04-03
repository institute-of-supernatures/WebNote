# Dart 复写父类方法
---

```dart
class Person {
  String name;
  int age;

  Person(this.name, this.age);

  void getUserInfo() {
    print("$name -- $age");
  }

  void work() {
    print("work: ${this.name}");
  }
}

class Web extends Person {
  Web(String name, int age) : super(name, age);
  
  run() {
    // 调用父类方法
    super.work();
  }

  // 复写父类方法
  @override
  void work() {
    print("${this.name}");
  }
}

main() {
  Web w = new Web("lis", 45);
  w.work(); // lis
  w.run(); // work: lis
}

```