# Dart 泛型
---

> 泛型就是解决类、接口、方法的复用性，以及对不特定数据类型的支持（类型校验）

```dart
// 范型方法
T getData<T>(T value) {
  return value;
}

main() {
  print(getData<String>("allen"));
  print(getData<int>(111));
}
```

> 泛型类

```dart
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
```

> 范型接口：实现数据缓存的功能<文件缓存，内存缓存>

1. 定义一个泛型接口，约束实现他的子类必须有getBykey(key)和setByKey(key, value)
2. 要求setByKey的时候的value的类型和实例化子类的时候指定的类型一致


```dart
import 'Dome17.dart';

abstract class Cache<T> {
  getByKey(String key);
  void setByKey(String key, T value);
}

class FileCache<T> implements Cache<T> {
  @override
  getByKey(String key) {
    return null;
  }

  @override
  void setByKey(String key, T value) {
    print("key - $key, value - $value");
  }
}

main() {
  var f = new FileCache<String>();
  f.setByKey("name", "allen");
  f.getByKey("name");
}
```