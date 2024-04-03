// main() {
//   print("Hellow Dart!"); // 打印
// }

void main() {
  // print("hellow dart!");

  // var age = 23;
  // String name = "AllenXD";
  // int year = 1997;
  // print("hellow " + name);
  // print(age);
  // print(year);

  // const PI = 3.1415926;
  // // PI = 3.14; 报错
  // print(PI);

  // final PAI = 3.1415926;
  // // PAI = 3.14; 报错
  // print(PAI);
  // final time1 = new DateTime.now();
  // // const time2 = new DateTime.now(); 报错
  // print(time1); // 当前时间

  var clapping = '\u{1f44f}';
  print(clapping);
  print(clapping.codeUnits);
  print(clapping.runes.toList());

  Runes input = new Runes('\u2665 \u{1f605} \u{1f60e} \u{1f47b} \u{1f44d}');
  print(new String.fromCharCodes(input));
}
