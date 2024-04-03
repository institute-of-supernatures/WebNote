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
