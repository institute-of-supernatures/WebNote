# Dart 函数
---

> 内置方法/函数
	
	print();
	
> 自定义方法/函数

	返回类型 函数名称 (参数1， 参数2 ...) {
		方法体
		reutrn 返回值;
	}
	
```dart
// 全局方法
void printInfo() {
  print("自定义方法");
}
String getString() {
  return 'abc';
}
List getList() {
  return [1, 2, 3, 4];
}

// 入口方法
void main() {
  print("系统内置方法");
  printInfo();
  
  int getNum() {
    var num1 = 123;
	
	// 局部方法，存在作用域
	aaa() {
	  print("aaa");
	}
	aaa();
	
	return num1;
  }
  
  var n = getNum();
  print(n); // 123
  
  // 求和方，指定传入参数类型，可选参数使用[]
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
  
  // 命名参数
  String printUserInfo(String username, {int age, String sex = "男"}){
    if(age != null){
	  return "$username -- $age -- $sex";
	}
	return "$username -- $age"
  }
  
  printUserInfo("张三", age:20);
  
  fn1() {
    print("fn1");
  }
  fn2(fn){
    fn();
  }
  fn2(fn1);// "fn1"
  
  var fn = () => {
    print("匿名函数");
  }
}
```

	箭头函数
	
```dart
main() {
  List arr = [1, 2, 3, 4];
  
  arr.forEach((vl)=>print(vl)); // 1 2 3 4
  var newArr = arr.map((vl)=>vl>2?vl*2:vl);
}
```

	自执行函数
	
```dart
main() {
  ((){
    print("自执行函数");
  })();
}
```

	递归
	
```dart
main() {
  var sum = 1;
  fn(n){
    sum *= n;
	if(n==1){
	  return;
	}
	fn(n-1);
  }
  fn(5);
  print(sum);
}
```

	闭包：函数嵌套函数，并return返回里面函数
	
```dart
main() {
  fn() {
    var a = 1;
	return() {
	  a++;
	  print(a);
	}
  }
  
  var b = fn();
  fn(); // 2
  fn(); // 3
  fn(); // 4
}
```