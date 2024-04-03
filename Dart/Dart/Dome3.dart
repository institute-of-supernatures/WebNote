main() {
  // for (var i = 0; i < 5; i++) {
  //   print("i --- $i");
  //   for (var j = 0; j < 3; j++) {
  //     if (j == 1) {
  //       break;
  //     }
  //     print("j -- $j");
  //   }
  // }

  var list3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var list4 = list3.where((vl) {
    return vl > 5;
  });
  print(list4.toList()); // [6, 7, 8, 9]
  var flagList = list3.any((vl) {
    return vl > 5;
  });
  print(flagList);
  var flgList = list3.every((vl) {
    return vl > 5;
  });
  print(flgList); // false

  var newSet = new Set();
  newSet.addAll([1, 2, 3, 4]);
  newSet.forEach((vl) {
    print(vl);
  });
}
