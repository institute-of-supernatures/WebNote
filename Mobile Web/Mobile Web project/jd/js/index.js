// 将代码保存到函数作用域, 防止全局污染
(function (window) {
    // header 渐变
    var header = document.querySelector('#header');

    // 事件监听, window滚动事件 
    window.addEventListener('scroll', function (e) {
        // 获取滚动条滚动的距离
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var slideHeight = document.querySelector('#slide').offsetHeight;

        if (scrollTop < slideHeight) {
            var opacity = scrollTop / slideHeight;
            // console.log(opacity);
            header.style.backgroundColor = 'rgba( 222, 24, 27,' + opacity + ')';
        } else {
            header.style.backgroundColor = 'rgb( 222, 24, 27)';
        }

    });

    // 轮播图

    var swiper = new Swiper('.swiper-container', {
        // 分页器
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
        },
        // 无限轮播
        loop: true,
        // 自动轮播
        autoplay: {
            delay: 1000,
            // 是否在最后一张时停止 加了loop无效
            stopOnLastSlide: false,
            // 滑动后是否停止自动轮播
            disableOnInteraction: true,
        }
    });

    // 倒计时
    var time = 2 * 60 * 60; // 时间从后台获取
    var spans = document.querySelectorAll('.seckill-downtime span');

    setInterval(function () {
        time--;
        var hour = Math.floor(time / 60 / 60);
        var minute = Math.floor((time % 3600) / 60);
        var second = Math.floor(time % 60);

        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = hour % 10;
        spans[3].innerHTML = Math.floor(minute / 10);
        spans[4].innerHTML = minute % 10;
        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = second % 10;
    }, 1000);

})(window)