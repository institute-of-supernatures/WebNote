abstract class Anmial {
  eat();
}

class Dog extends Anmial {
  @override
  eat() {
    print("Dog eat");
  }

  run() {
    print("run");
  }
}

class Cat extends Anmial {
  @override
  eat() {
    print("Cat eat");
  }

  run() {
    print("run");
  }
}

main() {
  Anmial d = new Dog(); // 只能获取Anmial类的方法
  d.eat();

  Anmial c = new Cat();
  c.eat();
}
