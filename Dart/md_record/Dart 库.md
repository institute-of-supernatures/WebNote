# Dart 库
--- 

	library指令可以创建一个库，每一个Dart文件都是一个库，即使没有使用library指令来指定
	
> Dart的库主要有三种

1. 自定义的库
	`import 引入`
2. 系统内置库
	`import 'dart:math';`
	`import 'dart:io';`
	`import 'dart:convert';`
	
```dart
import 'dart:math';

main() {
  print(min(12, 16));
  print(max(24, 12));
}
```

```dart
import 'dart:io';
import 'dart:convert';

main() async {
  var res = await _getDataFromZhihuApi();
  print(res);
}

_getDataFromZhihuApi() async {
  // 创建 HttpClient 对象
  var httpClient = new HttpClient();
  // 创建 Uri 对象
  var uri = new Uri.http("news-at.zhihu.com", '/api/3/stories/latest');
  // 发起请求
  var request = await httpClient.getUrl(uri);
  // 关闭请求
  var response = await request.close();
  // 解码
  return await response.transform(utf8.decoder).join();
}
```

3. Pub包管理系统中的库
	[pub](https://pub.dev/packages)
	[flutter-io](https://pub.flutter-io.cn/packages)
	[dartlang](https://pub.dartlang.org/flutter/)
	- 需要在自己项目的更目录新建一个`pubspec.yaml`
	- 在`pubspec.yaml`文件，配置名称、描述、依赖等
	- 运行`pub get`获取包下载到本地
	- 项目中引入库 `import 'package:http/http.dart' as http;`

```pubspec.yaml
name: Dome24
description: A Study Demo
dependencies:
  http: ^0.12.2
  date_format: ^1.0.8
```

**pub get国内镜像地址**
> mac
```
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```
> window
```
PUB_HOSTED_URL ===== https://pub.flutter-io.cn
FLUTTER_STORAGE_BASE_URL ===== https://storage.flutter-io.cn
```

> 重名模块重命名 as

```dart
import 'Person1.dart';
import 'Person2.dart' as per;

main(){
  Person p1 = new Person();
  per.Person p2 = new per.Person();
}
```

> 部分引入 show

```dart
import 'myMath.dart' show getMax;
main() {
  getMax();
}
```

> 部分不引入 hide

```dart
import 'myMath.dart' hide getMax;
main() {
  // getMax(); 报错
}
```

> 延时引入 deferred（使用loadLibrary）

```dart
import 'myMath.dart' deferred as other;
main() async{
  await other.使用loadLibrary();
  other.getMax();
}
```