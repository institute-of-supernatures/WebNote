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
