abstract class A {
  printA();
}

abstract class B {
  printB();
}

class C implements A, B {
  @override
  printA() {
    // TODO: implement printA
    print("A");
  }

  @override
  printB() {
    // TODO: implement printB
    print("b");
  }
}

main() {
  var c = new C();
  c.printA();
  c.printB();
}
