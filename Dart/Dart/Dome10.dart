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
