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
