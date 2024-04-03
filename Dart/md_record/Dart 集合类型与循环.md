# Dart 集合类型与循环
---

## List

> 常用属性

| 名称 | 属性方法 |
| ---- | ------ |
| length | 长度 |
| reversed | 翻转 |
| isEmpty | 是否为空 |
| isNotEmpty | 是否不为空 |

```dart
main() {

  var arr = ['a', 'b', 'c'];
  var newArr = arr.reversed.toList(); // 翻转数组
  print(newArr); // ['c', 'b', 'a']
  
}
```

> 常用方法

| 名称 | 属性方法 |
| ---- | ------ |
| add(value) | 增加 `传入具体值` |
| addAll(["value1", "value2"]) | 向后拼接数组 `传入List` |
| indexOf(value) | 查找 `传入具体值, 查不到返回-1，查得到返回索引` |
| remove(value) | 删除 `传入具体值` |
| removeAt(index) | 删除 `传入索引值` |
| fillRange(start, end, value) | 修改 `传入起始位置、终止位置、具体的值` |
| inset(index, value) | 指定位置后面插入 |
| insertAll(index, list) | 指定位置后面插入List |
| toList() | 其他类型转换成List |
| join() | List转换成字符串 |
| split() | 字符串转换成List |

> Set定义 <自动去除重复添加>

```dart
main() {

  var arr = new Set();
  arr.add('a');
  arr.add('a');
  arr.add('b');
  print(arr); // {'a', 'b'}
  print(arr.toList); // ['a', 'b']
  
  // List 去重
  var newArr = ['a', 'a', 'b', 'b', 'b', 'c'];
  var newSet = new Set();
  newSet.addAll(newArr);
  print(newSet.toList()); // ['a', 'b', 'c']
  
}
```

## Map

> 常用属性

| 名称 | 属性方法 |
| ---- | ------ |
| keys | 获取所有的key值 |
| values | 获取所有的value值 |
| isEmpty | 是否为空 |
| isNotEmpty | 是否不为空 |

> 常用方法

| 名称 | 属性方法 |
| ---- | ------ |
| remove(key) | 删除指定key的数据 |
| addAll({...}) | 合并Map `增加Map属性` |
| containsValue(value) | 查看Map中是否存在值 `返回true/false` |

## List 与 Map 与 Set

> 通用方法

| 名称 | 属性方法 |
| ---- | ------ |
| forEach | 循环（与for循环/forin循环类似） |
| map | 循环 返回当前遍历的数据，可进行数据处理 |
| where | 循环 返回当前符合条件的遍历数据，可进行数据过滤 |
| any | 循环 判断循环数据是否满足条件，返回true/false |
| every | 循环 判断每一个循环数据是否满足条件，返回true/false |

```dart
main() {

  var newList = ['a', 'b', 'c'];
  newList.forEach((vl){
    print('$vl'); // a b c
  });
  
  var list1 = [1, 2, 3];
  var list2 = list1.map((vl){
  	return vl*2;
  });
  print(list2.toList()); // [2, 4, 6]
  
  var list3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var list4 = list3.where((vl){
  	return vl > 5;
  });
  print(list4.toList()); // [6, 7, 8, 9]
  
  var flagList = list3.any((vl){
  	return vl > 5;
  });
  print(flagList); // true
  
  var flgList = list3.every((vl){
  	return vl > 5;
  });
  print(flgList); // false
  
  var newMap = {
  	"name": "Allen",
	"age"; 22,
	"sex": "男"
  }
  newMap.forEach((key, vl){
  	print("$key --- $vl"); // name --- Allen age --- 22 sex --- 男
  });
  
  var newSet = new Set();
  newSet.addAll([1, 2, 3, 4]);
  newSet.forEach((vl){
  	print(vl); // 1 2 3 4
  });
}
```