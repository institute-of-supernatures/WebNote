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
