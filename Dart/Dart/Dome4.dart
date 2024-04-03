main() {
  // 求和方法
  getSum(int n, [String name = "求和"]) {
    var sum = 0;

    for (int i = 0; i <= n; i++) {
      sum += i;
    }

    if (name != null) {
      return "$name -- $sum";
    } else {
      return sum;
    }
  }

  print(getSum(100));
}
