# 跨域
---

![[Homology/md_record/跨域同源]]

## 常见的跨域场景
---

1. 同一域名，不同端口
2. 同一域名，不同协议（http、https）
3. 域名和域名对应的IP
4. 主域相同，子域不同
5. 同一域名，不同二级域名
6. 不同域名

**注意：**

1. 协议和端口造成的跨域问题，前台是无能为力的
2. 在跨域问题上，仅仅通过“URL”的首部来识别而不会根据域名对应的IP地址是否相同来判断
3. 跨域不是请求发不出去，而是浏览器把请求回来的数据拦截了

## 解决方案
---

![[Homology/md_record/JSONP]]

![[Homology/md_record/CORS]]

![[Homology/md_record/postMessage]]

![[Homology/md_record/node 中间件代理]]

![[Homology/md_record/nginx 反向代理]]

![[Homology/md_record/websocket]]

![[Homology/md_record/window.name + iframe]]

