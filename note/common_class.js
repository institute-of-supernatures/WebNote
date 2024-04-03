/*
 * @Description: 公共Class
 * @Autor: Allen
 * @Date: 2021-03-04 12:04:41
 */

class Common {
  /**
   * @description: 通过id获取元素
   * @param {*} name 元素id
   * @return {*} 需要获取的元素
   * @author: Allen
   */
  getEl_id(name) {
    return document.getElementById(name);
  }
  /**
   * @description: 通过tag名获取元素
   * @param {*} name tag名
   * @return {*} 需要获取的元素
   * @author: Allen
   */
  getEl_tag(name) {
    return document.getElementsByTagName(name);
  }
  /**
   * @description: 通过class名获取元素
   * @param {*} name class名
   * @return {*}  需要获取的元素
   * @author: Allen
   */
  getEl_class(name) {
    return document.getElementsByClassName(name);
  }
  /**
   * @description: 获取单个元素
   * @param {*} oneName 元素class名/id名/tag名均可
   * @return {*} 需要获取的元素
   * @author: Allen
   */
  getEl_one(oneName) {
    return document.querySelector(oneName);
  }
  /**
   * @description: 获取多个元素
   * @param {*} allNmae 同名的class名/tag名均可
   * @return {*} 需要获取的元素组
   * @author: Allen
   */
  getEl_all(allNmae) {
    return document.querySelectorAll(allNmae);
  }
  /**
   * @description: 获取页面滚动距离的百分比数据
   * @return {*} 页面滚动百分比数据
   * @author: Allen
   */
  scroll_win() {
    let scroll_top = document.documentElement.scrollTop || document.body.scrollTop || 0;
    let client_height = Math.min(document.documentElement.clientHeight, document.body.clientHeight);
    let offset_height = Math.min(document.documentElement.offsetHeight, document.body.offsetHeight);
    let h = Number((scroll_top / (offset_height - client_height) * 100).toFixed(2));
    h = h < 0 ? 0 : h > 100 ? 100 : h;
    return `${h}%`;
  }
  /**
   * @description: 通过身份证获取生日
   * @param {*} cardNum 身份证号
   * @return {*} YYYY-MM-DD格式的日期
   * @author: Allen
   */
  get_birthday(cardNum) {
    let birthday = null;
    if (cardNum !== null && cardNum !== "") {
      if (cardNum.length === 15) {
        birthday = "19" + cardNum.substr(6, 6);
      } else if (cardNum.length === 18) {
        birthday = cardNum.substr(6, 8);
      }

      birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
    }
    return birthday;
  }
  /**
   * @description: 完成加载js
   * @param {*} url js路径
   * @author: Allen
   */
  async_js(url, isSetTime = false, timeout = 1000) {
    let el = document.createElement("script")
    el.src = url;
    if (isSetTime) {
      setTimeout(() => {
        document.body.appendChild(el);
      }, timeout);
    } else {
      if (window.addEventListener) {
        window.addEventListener("load", function () {
          document.body.appendChild(el);
        }, false)
      } else if (window.attachEvent) {
        window.attachEvent("onload", function () {
          document.body.appendChild(el);
        })
      } else {
        window.onload = function () {
          document.body.appendChild(el);
        }
      }
    }
  }
}

class Cookie {
  /**
   * @description: cookie设置
   * @param {*} name cookie名
   * @param {*} value cookie内容
   * @param {*} time cookie存在时间《天》
   * @return {*} 成功/失败
   * @author: Allen
   */
  set_cookie(name, value, time) {
    if (!value) return false;
    if (typeof value !== "string" || typeof value !== "number") {
      value = JSON.stringify(value);
    }
    let expires = time * 24 * 60 * 60 * 1000;
    let day = new Date(+new Date() + expires);
    document.cookie = time !== 0 ?
      `${name}=${value};path=/;expires=${day.toGMTString()}` :
      `${name}=${value};path=/`;
    return true;
  }
  /**
   * @description: 获取cookie数据
   * @param {*} name cookie名
   * @return {*} 获取到的value
   * @author: Allen
   */
  get_cookie(name) {
    let cookie = document.cookie, value = null;
    if (cookie.length > 0) {
      //检查这个cookie是否存在，不存在就为 -1
      let start = cookie.indexOf(`${name}=`);
      if (start !== -1) {
        // cookie开始位置
        start = start + name.length + 1;
        // 通过“;”获取结束位置
        let end = cookie.indexOf(";", start);
        if (end === -1) {
          end = cookie.length;
        }

        // 获取cookie值
        try {
          value = JSON.parse(cookie.substring(start, end));
        } catch (e) {
          value = cookie.substring(start, end);
        } finally {
          cookie = null
        }
        return value;
      }
    }
    return value;
  }
  /**
   * @description: 删除cookie
   * @param {*} name cooki名
   * @return {*} 成功/失败
   * @author: Allen
   */
  del_cookie(name) {
    if (!name) return false;
    let cookie_key = document.cookie.match(/[^=;]+(?=\=)/g);
    if (cookie_key.includes(name)) {
      document.cookie = `${name}=0;path=/;expires=${new Date(0).toUTCString()}`;
      return true;
    }
    return false;
  }
  /**
   * @description: 清除所有的cookie
   * @author: Allen
   */
  clear_cookie() {
    let cookie_key = document.cookie.match(/[^=;]+(?=\=)/g);
    if (cookie_key.length > 0) {
      for (let i = cookie_key.length; i--;) {
        document.cookie = `${cookie_key[i]}=0;path=/;expires=${new Date(0).toUTCString()}`;
      }
      return true;
    }
    return false;
  }
}

class Animation {
  /**
   * @description: 获取元素属性
   * @param {*} el 元素对像
   * @param {*} name 需要获取的属性名
   * @return {*} 属性数据
   * @author: Allen
   */
  get_style(el, name) {
    let style = window.getComputedStyle ?
      getComputedStyle(el, null)[name] :
      el.currentStyle[name];
    return style;
  }
  /**
   * @description: 匀速动画
   * @param {*} el 需要移动的元素
   * @param {*} target 移动的距离
   * @param {*} dire 运动方向（默认横向）
   * @author: Allen
   */
  move(el, target, dire = true) {
    // 先清除之前的动画
    clearInterval(el.timeID);
    if (dire) {
      el.timeID = setInterval(() => {
        // 当前位置
        let current_left = el.offsetLeft;
        // 开始移动
        let is_left = current_left <= target ? true : false;
        is_left ? current_left += 20 : current_left -= 20;
        el.style.left = `${current_left}px`;

        // 边界检测
        if (is_left ? current_left >= target : current_left <= target) {
          clearInterval(el.timeID);
          // 元素复位
          el.style.left = `${target}px`;
        }
      }, 20);
    } else {
      el.timeID = setInterval(() => {
        let current_top = el.offsetTop;
        let is_top = current_top <= target ? true : false;
        is_top ? current_top += 20 : current_top -= 20;
        el.style.Top = `${current_top}px`;

        if (is_top ? current_top >= target : current_top <= target) {
          clearInterval(el.timeID);
          el.style.Top = `${target}px`;
        }
      }, 20);
    }
  }
  /**
   * @description: 缓动动画
   * @param {*} el 元素
   * @param {*} attrs 需要改变的属性
   * @param {*} fn 回调函数， 动画结束后执行
   * @author: Allen
   */
  slow(el, attrs, fn) {
    clearInterval(el.timeID);
    el.timeID = setInterval(() => {
      let is_all_ok = true;
      for (let key in attrs) {
        let attr = key, target = attrs[key], current = parseFloat(this.get_style(el, style)), step = (target - current) / 10;
        switch (key) {
          case "zIndex":
            el.style.zIndex = attrs[key];
            break;
          case "backgroundColor":
            el.style.backgroundColor = attrs[key];
            break;
          case "opacity":
            target = target * 100;
            current = current * 100;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            current += step;
            el.style[attr] = current / 100;
            if (current != target) {
              is_all_ok = false;
            }
            break;
          default:
            step = step >= 0 ? Math.ceil(step) : Math.floor(step);
            current += step;
            el.style[attr] = `${current}px`;
            if (current != target) {
              is_all_ok = false;
            }
            break;
        }
      }
      if (is_all_ok) {
        clearInterval(el.timeID);
        if (typeof fn === 'function') {
          fn();
        }
      }
    }, 50);
  }
}