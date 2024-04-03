import 'lib/Person.dart';

main() {
  // var d = new DateTime.now();
  // Person p1 = new Person("Allen", 22);
  Person p1 = new Person.now(); // 匿名构造函数
  Person p2 = new Person.setInfo("aimer", 30);
  p2.getInfo(); // aimer -- 30
}
