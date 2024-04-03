class Person {
  String name;
  int age;

  Person(this.name, this.age);
  Person.setN(this.name, this.age);

  void getUserInfo() {
    print("$name -- $age");
  }
}

class Web extends Person {
  String sex;
  // super 表示将值传给父类
  Web(String name, int age, String sex) : super.setN(name, age) {
    this.sex = sex;
  }

  void run() {
    print("$name -- $age -- $sex");
  }
}

main() {
  Person p = new Person("lis", 30);
  p.getUserInfo(); // lis -- 30
  Web w = new Web("zhangs", 40, "男");
  w.getUserInfo(); // zhangs -- 40
  w.run(); // zhangs -- 40 -- 男
}
