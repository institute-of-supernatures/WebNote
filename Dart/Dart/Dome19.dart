// 范型方法
T getData<T>(T value) {
  return value;
}

main() {
  print(getData<String>("allen"));
  print(getData<int>(111));
}
