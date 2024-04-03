# JSONP
---

利用`scipt`标签没有跨域限制的漏洞，网页可以得到从其他来源动态生产的JSON数据

**JSONP 请求一定需要对方的服务器支持**

AJAX属于同源策略，与JSONP相反

JSONP兼容性好，但仅支持GET方法，具有局限性

```js
function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    window[callback] = function (data) {
      resolve(data);
      document.body.removeChild(script);
    }
    params = [...params, callback];
    let arrs = [];
    for(let key in params) {
      arrs.push(`${key}=${params[key]}`);
    }
    script.src = `${url}?${arrs.join("&")}`;
    document.body.appendChild(script);
  })
}
```

## Jquery的JSONP
---

在使用Jquery发送AJAX时， 设置 `dataType: jsonp`