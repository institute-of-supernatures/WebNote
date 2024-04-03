class Person {
  String name;
  int age;

  Person(this.name, this.age);
  void getUserInfo() {
    print("$name -- $age");
  }
}

main() {
  Person p;
  p?.getUserInfo(); // 判断p是否存在该方法，不存在不进行调用

  var p1 = new Person("name", 22);
  if (p1 is Person) {
    p1.name = "里斯";
  }
  p1.getUserInfo(); // 里斯 -- 22

  print(p1 is Object); // true

  var p2;
  p2 = "";
  p2 = new Person("allen", 23);
  // 强转p2类型为Person
  (p2 as Person).getUserInfo();

  var p3 = new Person("aimer", 23);
  // p3.getUserInfo();
  p3
    ..name = "aimers"
    ..age = 22
    ..getUserInfo();
}
