class PrintList<T> {
  List list = new List<T>();
  void add(T value) {
    list.add(value);
  }

  void printList() {
    print(list);
  }
}

main() {
  // List arr = new List<String>();
  // arr.add("a");
  // arr.add("b");
  // print(arr);

  PrintList p = new PrintList<String>();
  p.add("a");
  p.add("b");
  p.printList();
}
