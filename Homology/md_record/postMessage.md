# postMessage
---

H5中XMLHttpLevel2中的API，可以跨域操作的window属性之一

postMessage方法允许来自不同源的脚本采用异步方式进行有限的通讯，可以实现跨文本文档，多窗口，跨域传递信息

1. 页面和其他打开的新窗口的数据传输
2. 多窗口之间的信息传递
3. 页面与嵌套的iframe的消息传递
4. 上面三个场景的跨域数据传递

```js
otherWindow.postMessage(message, targetOrigin, [transfer])
```

> message：要发送到其他window的数据
> targetOrigin：通过origin属性来指定那些窗口能够接收消息事件，其值为字符串`*`表示无限制，如果目标窗口的协议、主机地址或者端口号有任意不匹配，就不会发送消息
> transfer（可选）：Transferable对象，这些对象的所有权被转移给消息的接收方，发送方不保留所有权

```html
<!-- a.html -->
<iframe src="http://localhost:400/b.html" frameborder="0" id="iframe" onload="load()"></iframe>
<script>
	function load() {
		let frame = document.getElementById("iframe");
		frame.contentWindow.postMessage("iloveyou", "http://localhost:400");
		window.onmessage = function (e){
			console.log(e.data); //no
		}
	}
</script>

<!-- b.html -->
<script>
	window.onmessage = function(e) {
		console.log(e.data); // iloveyou
	}
	e.source.postMessage("no", e.origin)
</script>
```
