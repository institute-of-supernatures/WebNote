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
