
﻿// var baseUrl = ""; 8202
var baseUrl = "";
var imgUrl = 'https://172.16.2.199/lyx/images/'

/** ajax
 * @param 对象item
 * url / success 必填 
 */

var axios = function (item) {
  var showShade = true;
  if (item.showShade) {
    showShade = false;
  }
  // 过滤地址
  if (
    item.url == "/vasp-api/mtmOperatApply/queryMyAuditResultNum" ||
    item.url == "/vasp-api/mtmOperatApply/queryDimbyGuestSname" ||
    item.url == "/vasp-api/useraudit/auditStatistics" ||
    item.url == "/vasp-api/mtmGuest/queryGuestCodeAddr" ||
    item.url == "/vasp-api/city/searchCityByCode" ||
    item.url == "/vasp-api/mtmGuest/queryDimGuestNameForHigh" ||
    item.url == '/vasp-api/mtmOperatApply/queryDimbyApplyName' ||
    item.url == '/vasp-api/lymallOrder/queryCitySelect' ||
    item.url == '/vasp-api/loadfile_common/uploadFile'
  ) {
    showShade = false;
  }

  $.support.cors = true;

  var url;
  // debugger
  baseUrl = "";
  // baseUrl = "http://192.168.51.46:8202";
  baseUrl = item.baseUrl || baseUrl;
  if (baseUrl === 'shopApi') {
    url = '' + item.url;
    // url = '' + item.url;
  } else {
    url = baseUrl + item.url;
  }
  var type = item.type || "POST";
  var parmas = item.parmas || null;
  var dataType = item.dataType || "JSON";
  var async = item.async || false;
  var cache = item.cache || false;
  var contentType = item.contentType || "application/json;charset=utf-8";
  var timeout = item.timeout || 5000;
  var success = item.success;
  var error = item.error || null;
  var processData = item.processData || false;
  var complete = item.complete || null;
  var ifencrypt = item.ifencrypt || false;
  var data = null;
  var isFalse = item.isFalse || "0";
  if (showShade) {
    loading();
  }

  if (!success) {
    alert("请传入成功的回调函数");
  }
  if (ifencrypt) {
    data = JSON.stringify(interceptors(url, parmas));
  } else {
    data = JSON.stringify(parmas);
  }
  var token = publicObj.get_cookie("accessToken") || null;
  if (!token) {
    publicObj.clear_cookie();
  }
  $.ajax({
    type: type,
    url: url,
    dataType: dataType,
    data: data,
    async: async,
    cache: cache,
    beforeSend: function (xhr) {
      if (token) {
        xhr.setRequestHeader("accessToken", token);
      }
    },
    timeout: timeout,
    contentType: contentType,
    processData: processData,
    success: function (res) {

      if (showShade) {
        removeLoading()
      }
      if (isFalse == "2") {
        success(res);
        return false;
      }
      if (res.list) {
        publicObj.getIndex(res.list);
      }
      if (res.code == 200) {
        try {
          if (res.data != null && res.data != "") {
            success(JSON.parse(utils.decrypt(res.data)));
          } else {
            success(res.data);
          }
        } catch (error) {
          if (res.data == "") {
            success(res.data);
          }
          success(utils.decrypt(res.data));
        }
      } else {
        if (res.code == 202) {
          // 登录失败
          success(res);

          return false;
        } else if (isFalse == "0") {
          alert(utils.decrypt(res.data));
        } else {
          success(utils.decrypt(res.data));
        }
      }
    },
    error: function (err) {

      removeLoading()

      if (!error) {
        if (err && err.status) {
          var str = "";
          switch (err.status) {
            case 400:
              str = "无效请求";
              alert(str);
              break;
            case 401:
              str = "登录超时,请重新登录";
              window.parent.location.href = "/public/view/login.html";
              alert(str);
              break;
            case 403:
              str = "拒绝访问";
              alert(str);
              break;
            case 404:
              str = "请求出错";
              alert(str);
              break;
            case 408:
              str = "请求超时";
              alert(str);
              break;
            case 500:
              str = "服务器错误";
              alert(str);
              break;
            case 501:
              str = "服务未实现";
              alert(str);
              break;
            case 502:
              str = "网络错误";
              alert(str);
              break;
            case 503:
              str = "服务不可用";
              alert(str);
              break;
            case 504:
              str = "网络超时";
              alert(str);
              break;
            case 505:
              str = "HTTP版本不受支持";
              alert(str);
              break;
            case 510:
              str = "传入的参数不合规则或者参数写法错误，请检查参数!";
              alert(str);
              break;
            default:
              // str = "连接出错:" + err.responseJSON.message
              break;
          }

          return false;
        } else {
          // includes
          if (err.statusText.indexOf("timeout")) {
            alert("请求超时");
          } else if (err.statusText.indexOf("NetworkError")) {
            alert("后台接口网络异常");
          } else {
          }
        }
      } else {
        publicObj.clear_cookie();
        error(err);
      }
    }
  });
};
//过滤器
var interceptors = function (url, parmas) {
  var index = url.lastIndexOf("/");
  var method = url.substring(index + 1, url.length);
  var code = "200";
  var timestamp = Date.parse(new Date());
  var appkey = "100aaafdcsww01";
  var appSecret = "10000sfdwwass0001";
  var version = "1.0";
  var sign = appkey + appSecret + method + timestamp + version;
  var data = {};
  data.method = method;
  data.timestamp = timestamp;
  data.appKey = appkey;
  data.appSecret = appSecret;
  data.version = version;
  data.sign = $.md5(sign);
  data.code = code;

  if (typeof parmas == "string") {
    data.data = utils.encrypt(parmas) || null;
  } else {
    data.data = utils.encrypt(JSON.stringify(parmas)) || null;
  }

  return data;
};

layui.use("element", function () {
  var element = layui.element;
  $("body").on("change", "input[type=text]", function (e) {
    e.stopPropagation();
    if (publicObj.verify_Xss($(this).val())) {
      $(this).val("");
      layer.msg("存在特殊字符, 请检查!");
    }
  });
  $("body").on("change", "input[type=search]", function (e) {
    e.stopPropagation();
    if (publicObj.verify_Xss($(this).val())) {
      $(this).val("");
      layer.msg("存在特殊字符, 请检查!");
    }
  });
  $("body").on("change", "textarea", function (e) {
    e.stopPropagation();
    if (publicObj.verify_Xss($(this).val())) {
      $(this).val("");
      layer.msg("存在特殊字符, 请检查!");
    }
  });
});

/** loading
  */
function loading () {
  var str =
    '<div class="loadings">' +
    '<div class="shades"></div>' +
    '<img src="/public/images/loading.gif" alt="">' +
    "</div>";
  $(str).appendTo("body");
}

/** removeLoading
 * 
  */
function removeLoading () {
  setTimeout(function () {
    $(".loadings").remove();
  }, 500);
}