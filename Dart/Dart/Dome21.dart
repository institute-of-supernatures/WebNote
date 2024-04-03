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
