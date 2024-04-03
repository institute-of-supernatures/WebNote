# Dart 循环语句
---

1. 自增 / 自减
	- `++`
	- `--`
	- `++/--`写在前面表示先增/减后赋值，写在后面表示先赋值后增减
2. for循环

```dart
main() {
  
  for(int i = 0; i <= 100; i++){
    print(i);
  }
  
}
```

3. while循环

```dart
main() {
  
  int i = 1;
  while(i<10){
    print(i);
	i++;
  }
  
}
```

4. do while循环 <与while循环区别，do while无论条件是否通过会先执行一次>

```dart
main() {

  var i = 1;
  do{
    print(i);
	i++;
  }while(i <= 10);
  
}
```

> break 与 continue

**continue: 跳过当前循环，后续循环继续执行**
**break： 跳出循环体，后续循环不执行（只能跳出当前循环体，外层循环无效果）**