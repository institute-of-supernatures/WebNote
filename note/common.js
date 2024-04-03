/** 
 * Create by Allen on 2017/12/8
 * 工具类封装的好处：（1）复用性高      （2）便于维护
 * WebApi工具类：常用快捷代码封装/浏览器兼容性封装/动画封装
*/

//                                                                           快捷定义                                                                           \\

var fast = {
    /** 通过id获取元素
    *   @param idName: 元素id字符串
    *   @return 获取到的dom对象
    */

    id: function (idName) {
        return document.getElementById(idName);
    },
    /** 通过标签获取元素
     *   @param tagName: 元素tag字符串
     *   @return 获取到的dom对象
     */

    tag: function (tagName) {
        return document.getElementsByTagName(tagName);
    },
    /** 通过class获取元素
     *   @param className: 元素class字符串
     *   @return 获取到的dom对象
     */

    class_name: function (className) {
        return document.getElementsByClassName(className);
    },
    /** 通过选择器获取元素
     * @param {classOne classAll}：元素选择器名
     * @return 获取到的dom对象
     */
    class_one: function (classOne) {
        return document.querySelector(classOne);
    },
    class_all: function (classAll) {
        return document.querySelectorAll(classAll);
    },
    /** 通过name获取元素
     *   @param Name: 元素name字符串
     *   @return 获取到的dom对象
     */
    names: function (Name) {
        return document.getElementsByName(Name);
    },
    /** 通过color获取元素背景颜色属性
     * @param useName: 元素辨认字符串( id名、类名、声明的变量)
     * @param colorName：元素背景色值
     * @return 获取到的dom对象
     */
    color: function (useName, colorName) {
        return useName.style.background = colorName;
    },
    /** 可以实现对数组排序从小到大，也可以从大到小
     * @param arr：要排序的数组
     * @param flag：排序方式 true：从小到大  false：从大到小
     */
    get_max: function (a, b) { // 从小到大
        return a - b;
    },
    get_min: function (a, b) { // 从大到小
        return b - a;
    },
    sort_arr: function (arr, flag) {
        if (flag) {
            return arr.sort(fast.get_max);
        } else {
            return arr.sort(fast.get_min);
        }
    },
    /** 获取页面滚动百分比
     * 
     */
    scrollWin: function () {
        var scorllTop = document.documentElement.scrollTop || document.body.scorllTop || 0;
        var clientHeight = Math.min(document.documentElement.clientHeight, document.body.clientHeight);
        var offsetHeight = Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
        var h = Number((scorllTop / (offsetHeight - clientHeight) * 100).toFixed(2));
        h = h < 0 ? 0 : h;
        h = h > 100 ? 100 : h;
        console.log(h);
        return (
            h + "%"
        )
    }

}


//                                                                           ie8兼容                                                                           \\

var ie = {
    /** 设置元素文本内容兼容性封装
     * @param ele  元素
     * @param text  文本
     * @return {*}   无返回值
     */
    set_text: function (ele, text) {
        //能力检测
        if (ele.innerText == undefined) {//获取不到，火狐42之前浏览器
            ele.textContent = text;//直接获取textContent
        } else {//如果innerText可以使用（非IE8浏览器）
            ele.innerText = text;
        }
    },
    /** 获取元素文本内容兼容性封装
     * @param ele  元素
     * @return {*}   文本内容
     */
    get_text: function (ele) {
        //能力检测
        if (ele.innerText == undefined) {//获取不到，火狐42之前浏览器
            return ele.textContent;//直接获取textContent
        } else {//如果innerText可以使用（非IE8浏览器）
            return ele.innerText;
        }
    },
    /** 获取元素的上一个兄弟元素
     * @param ele 元素
     * @return 元素的上一个兄弟元素
     */
    get_prev_sibling: function (ele) {
        // 能力检测
        if (ele.previousElementSibling) {
            return ele.previousElementSibling; // 返回上一个兄弟元素
        } else { // IE8
            // 获取上一个兄弟节点
            var node = ele.previousSibling;
            // 节点不是null、nodeType ！= 1
            while (node != null && node.nodeType != 1) {
                node = node.previousSibling;
            }
            // 循环结束：node为null（找到顶了还没找到）  node.nodeType== 1
            return node;
        }
    },
    /** 获取元素的下一个兄弟元素
     * @param ele 元素
     * @return 元素的下一个兄弟元素
     */
    get_next_sibling: function (ele) {
        if (ele.nextElementSibling) {
            return ele.nextElementSibling;
        } else {
            var node = ele.nextSibling;
            while (node && node.nodeType != 1) {
                node = node.nextSibling;
            }
            return node;
        }
    },
    /** 获取元素第一个子元素
     * @param ele 父元素
     * @return 第一个子元素
     */
    get_first_child: function (ele) {
        //能力检测
        if (ele.firstElementChild) {
            return ele.firstElementChild;
        } else {  // IE8
            // 获取第一个子节点
            var node = ele.firstChild;
            while (node && node.nodeType != 1) {
                node = node.nextSibling;
            }
            // 返回第一个子元素
            return node;
        }
    },
    /** 获取元素最后一个子元素
     * @param ele 父元素
     * @return 最后一个子元素
     */
    get_last_child: function (ele) {
        if (ele.lastElementChild) {
            return ele.lastElementChild;
        } else {
            var node = ele.lastChild;
            while (node && node.nodeType != 1) {
                node = node.previousSibling;
            }
            return node;
        }
    },
    /** 获取元素的属性值
     * @param ele 元素
     * @param attribute 属性名字符串
     */
    get_style: function (ele, attribute) {
        // 能力检测
        if (window.getComputedStyle) {
            var style = window.getComputedStyle(ele, null);
            /* 这里不能使用点语法：attribute 传的值是字符串*/
            return style[attribute];
        } else { // IE8
            return ele.currentStyle[attribute];
        }
    },
    /** 获取页面滚动出去的距离
     * @return {{scrollLeft: number, scrollTop: number}} 页面左边滚动出去的距离，页面上边滚动出去的距离
     */
    get_page_scroll: function () {
        // 能力检测：使用逻辑或表达式的短路运算
        // 一真则真 window      html        body
        return {
            scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
            scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        };
    },
    /** 获取页面可视区域的距离
     * @return {{clientWidth: number, clientHeight: number}} 页面可视区域的宽 , 页面可视区域的高
     */
    get_client_size: function () {
        // 能力检测：逻辑或短路
        return {
            clientWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
            clientHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
        }
    },
    /** 获取鼠标触发点相对于页面左上角的距离
     * @param e：事件对象
     */
    get_page_point: function (e) {
        e = e || window.event;
        return {
            pageX: e.pageX || e.clientX + getPageScroll().scrollLeft,
            pageY: e.pageY || e.clientY + getPageScroll().scrollTop
        }
    },
    /**注册多个同名事件
     * @param {*} ele  元素
     * @param {*} type 事件类型字符串 不要on
     * @param {*} fn  事件处理函数
     */
    add_event: function (ele, type, fn) {
        // 能力检测
        if (ele.addEventListener) {
            return ele.addEventListener(type, fn);
        } else {
            ele.attachEvent('on' + type, fn);
        }
    },
    /** 删除多个同名事件
     * @param {*} ele 元素
     * @param {*} type 事件类型字符串 不要on
     * @param {*} fn 事件处理函数
     */
    remove_event: function (ele, type, fn) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, fn);
        } else {
            ele.detachEvent('on' + type, fn);
        }
    },
    /** 查询导出
     * @param {Object} item 查询内容
     * @param {*} url 请求地址
     */
    exports: function (item, url) {
        var $Export = $("<form method='post'></form>");
        $Export.attr("action", baseUrl + url);
        for (var i in item) {
            $Export.append('<input type="hidden" name="' + i + '" value="' + item[i] + '" />');
        }
        $(document.body).append($Export);
        $Export.submit().remove();
    },
    /** 文件下载方法
     * @param {*} fileName 文件名
     * @param {*} url 请求地址
     */
    down_load: function (fileName, url) {
        var $download = $("<form method='post'></form>");
        $download.attr("action", url);
        $download.append('<input type="hidden" name="fileName" value="' + fileName + '" />');
        $(document.body).append($download);
        //提交表单，实现下载
        $download.submit().remove();
    },
    /** 判断localStorage是否可用
     */
    has_localStorage: function () {
        // typeof localStorage
        if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
            return true
        } else {
            return false;
        }
    },
    /** localStorage设置
     * @param {*} key 名称
     * @param {*} value 内容
     * @param {*} day 时间
     */
    set_item: function (key, value, day) {
        var time = day || 0;
        var time = day || 0;
        if (ie.has_localStorage()) {
            try {
                localStorage.setItem(key, value)
            } catch (error) {
                console.log('localStorage.getItem error: ', error.message);
            }
        } else {
            utils.set_cookie(key, value, time)
        }
    },
    /** localStorage获取
     * @param {*} key 名称
     * @return 存储的值
     */
    get_item: function (key) {
        var value;
        if (ie.has_localStorage()) {
            try {
                value = localStorage.getItem(key)
            } catch (error) {
                console.log('localStorage.getItem error: ', error.message);
            }
            finally {
                return value
            }
        } else {
            return utils.get_cookie(key)
        }
    },
    /** localStorage删除
     * @param {*} key 名称
     */
    del_item: function (key) {
        if (ie.has_localStorage()) {
            try {
                localStorage.removeItem(key);
            } catch (error) {
                console.log('localStorage.getItem error: ', error.message);
            }
        } else {
            utils.del_cookie(key)
        }
    },
    /** localStorage清除
     */
    clear_item: function () {
        if (ie.has_localStorage()) {
            try {
                localStorage.clear();
            } catch (error) {
                console.log('localStorage.getItem error: ', error.message);
            }
        } else {
            utils.clear_cookie()
        }
    }
}

//                                                                           常用方法                                                                           \\

var utils = {
    /** 数组追加序号
     * @param {Array} list 需要增加序号的数组
     * @return {Array} list 
     */
    set_index: function (list) {
        for (var i = 0; i < list.length; i++) {
            list['index'] = i + 1;
        }
        return list;
    },
    /** 身份证获取生日
     * @param {*} idCard 身份证号
     * @return 日期 yyy-mm-dd
     */
    getBirthdayFromIdCard: function (idCard) {
        var birthday = "";
        if (idCard != null && idCard != "") {
            if (idCard.length == 15) {
                birthday = "19" + idCard.substr(6, 6);
            } else if (idCard.length == 18) {
                birthday = idCard.substr(6, 8);
            }

            birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
        }
        return birthday;
    },
    /** 设置cookie
 * @param {*} name cookie名字
 * @param {*} vlaue cookie的值 
 * @param {*} time 时间 默认没null
 */
    set_cookie: function (name, vlaue, time) {
        if (typeof value == "string") {
            value = value;
        } else {
            value = JSON.stringify(value);
        }
        if (day !== 0) {
            //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
            var expires = day * 24 * 60 * 60 * 1000;
            var date = new Date(+new Date() + expires);
            document.cookie =
                name + "=" + value + ";expires=" + date.toGMTString() + ";path=/";
        } else {
            document.cookie = name + "=" + value + ";path=/";
        }
    },
    /** 获取cookie
     * @param {*} name cookie的名字 
     * @return {*} cookie的值
    */
    get_cookie: function (name) {
        var cookie = document.cookie;

        if (cookie.length > 0) {
            //检查这个cookie是否存在，不存在就为 -1
            var start = cookie.indexOf(name + "=");
            if (start != -1) {
                //获取cookie值的开始位置
                start = start + name.length + 1;
                //通过";"号是否存在来判断结束位置
                var end = cookie.indexOf(";", start);

                if (end == -1) {
                    end = cookie.length;
                }
                //通过substring()得到了值

                try {
                    return JSON.parse(cookie.substring(start, end));
                } catch (error) {
                    return cookie.substring(start, end);
                }
            }
        }
        return "";
    },
    /** 删除cookie
     * @param {*} name cookie的名字
    */
    del_cookie: function (name) {
        utils.set_cookie(key, "", -1);
        return false;
    },
    /** 清空cookie
     */
    clear_cookie: function () {
        var cookieKey = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (cookieKey) {
            for (var i = 0; i < cookieKey.length; i++) {
                utils.del_cookie(cookieKey[i]);
            }
        }
    },
    /** 获取当前日期
     * @return {Date} 日期
     */
    get_date: function () {
        var myDate = new Date();
        var year = myDate.getFullYear(); //获取当前年
        var mon = myDate.getMonth() + 1; //获取当前月
        var date = myDate.getDate(); //获取当前日
        var data = year + "-" + mon + "-" + date;
        return data;
    },
    /** 获取当前时间
     * @return {Date} 时间
     */
    get_time: function () {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        var h = date.getHours();
        h = h < 10 ? "0" + h : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        return h + ":" + minute + ":" + second;
    },
    /** 判断特殊字符
     * @param {*} str 需要判断的文本
     * @return {Boolean} true/false
     */
    verify_Xss: function (str) {
        var patrn = /[`~$%^*\+<>"'\[\]·~￥%……*——\+《》【】]/im;
        if (!patrn.test(str)) {
            // 包含特殊字符
            return false;
        } else {
            // 不包含特殊字符
            return true;
        }
    },
    /** 判断身份证性别
     * @param {*} psidno 身份证号码
     * @return {String} F/M 男/女
     */
    get_sex: function (psidno) {
        var sexno, sex;
        if (psidno.length == 18) {
            sexno = psidno.substring(16, 17);
        } else if (psidno.length == 15) {
            sexno = psidno.substring(14, 15);
        } else {
            // alert("错误的身份证号码，请核对！")
            return false;
        }
        var tempid = sexno % 2;
        if (tempid == 0) {
            sex = "F";
        } else {
            sex = "M";
        }
        return sex;
    },
    /** 手机号加密显示
     * @param {*} mobile 手机号
     * @return mobile 加密后的手机号
     */
    encrypt_mobile: function (mobile) {
        if (mobile) {
            return mobile.substr(0, 3) + '****' + mobile.substr(7);
        } else {
            return ''
        }
    },
    /** 身份证号加密显示
     * @param {*} cardNum 身份证号
     * @param {*} 加密后的身份证号
     */
    encrypt_id_card: function (cardNum) {
        if (cardNum) {
            let newStr = ''
            newStr = cardNum.substring(0, cardNum.length - 4) + '***' + cardNum.substring(cardNum.length - 1)
            return newStr
        } else {
            return ''
        }
    }
}

//                                                                           动画                                                                           \\

var animation = {
    /** 匀速动画封装(横向))
     * @param ele 要移动的元素
     * @param target 移动距离
     * @param {Boolean} dire 运动方向
     */
    move: function (ele, target, dire) {
        var dires = dire || true;
        if (dires) {
            // 先清除之前的动画
            clearInterval(ele.timeID);
            // 开始本次移动
            ele.timeID = setInterval(function () {
                // 获取当前位置
                var currentLeft = ele.offsetLeft;
                // 开始移动
                var isLeft = currentLeft <= target ? true : false;
                isLeft ? currentLeft += 20 : currentLeft -= 20;
                ele.style.left = currentLeft + "px";
                // 边界检测

                if (isLeft ? currentLeft >= target : currentLeft <= target) {
                    clearInterval(ele.timeID);
                    // 元素复位
                    ele.style.left = target + "px";
                }
            }, 20)
        } else {
            // 先清除之前的动画
            clearInterval(ele.timeID);
            // 开始本次移动
            ele.timeID = setInterval(function () {
                // 获取当前位置
                var currentTop = ele.offsetTop;
                // 开始移动
                var isTop = currentTop <= target ? true : false;
                isTop ? currentTop += 20 : currentTop -= 20;
                ele.style.Top = currentTop + "px";
                // 边界检测

                if (isTop ? currentTop >= target : currentTop <= target) {
                    clearInterval(ele.timeID);
                    // 元素复位
                    ele.style.Top = target + "px";
                }
            }, 20)
        }
    },
    /** 缓动动画封装
     * @param ele 要移动的元素
     * @param attrs 要移动的属性对象
     * @param fn：回调函数 如果传了，动画结束后执行该代码
     */
    slow: function (ele, attrs, fn) {
        // 先清除之前的动画
        clearInterval(ele.timeID);
        // 开始本次移动
        ele.timeID = setInterval(function () {
            /* 开关思想 */
            // 提出假设
            var isAllOk = true;
            for (var key in attrs) {
                // 层级是瞬变属性，不需要动画
                if (key == 'zIndex') {
                    ele.style.zIndex = attrs[key];
                    console.log(attrs[key]);
                } else if (key == 'backgroundColor') {
                    ele.style.backgroundColor = attrs[key];
                } else if (key == 'opacity') {
                    var attr = key;
                    var target = attrs[key] * 100;
                    //2.1 先获取当前位置
                    /* 注意点：透明度是0-1小数，应该使用parseFloat */
                    var current = parseFloat(getStyle(ele, attr)) * 100;
                    //2.2 计算本次移动距离 = (目标位置 - 当前位置)/10
                    var step = (target - current) / 10;
                    //取整： 从左往右step>0 : 向上取整   从右往左step<0 : 向下取整
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    //2.3 开始移动
                    current += step;
                    ele.style[attr] = current / 100;
                    //2.4 终点检测
                    //二：验证假设：只要有任何属性没有到达终点，假设被推翻
                    if (current != target) {
                        isAllOk = false;
                    }
                } else {
                    // 声明两个变量取属性名和属性值，后面的代码不变
                    var attr = key;
                    var target = attrs[key];
                    // 获取元素当前位置
                    /* getStyle函数返回的是一个字符串类型，并且是带单位的 */
                    var current = parseInt(getStyle(ele, attr));
                    // 移动距离 = （ 目标位置 - 当前位置 ）/10 【向上取整】
                    var step = (target - current) / 10;
                    // 判断step （-1 ~ 0 之间的小数向上取整为0，会产生误差），小于0 向下取整
                    step = step >= 0 ? Math.ceil(step) : Math.floor(step);
                    // 开始移动
                    current += step;
                    ele.style[attr] = current + 'px';
                    // 终点检测
                    // 验证假设：确保多属性都与移动数值相等
                    if (current != target) {
                        isAllOk = false;
                    };
                }
            }
            // 根据验证返回结果
            if (isAllOk) {
                // 清除定时器
                clearInterval(ele.timeID);
                // 如果用户传了第三个参数，就执行
                if (typeof fn == 'function') {
                    fn();
                }
            }
        }, 50)
    }
}
