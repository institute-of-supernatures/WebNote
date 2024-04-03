class A {
  printA() {
    print("A");
  }
}

class B {
  printB() {
    print("B");
  }
}

class C with A, B {}

main() {
  var c = new C();
  c.printA();
  c.printB();
}
