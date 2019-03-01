(function (window) {
    var swiper1 = new Swiper('.left .swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
        // mousewheel: false,
    });

    var swiper2 = new Swiper('.right .swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        // 滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        // 滚轮滚动
        mousewheel: true,
    });

    var parentH = document.querySelector('.swiper-container').offsetHeight;
    var childrenH = document.querySelector('.swiper-slide').offsetHeight
    var swiperWrapper = document.querySelector('.swiper-wrapper');
    // 左侧分类点击效果
    var liList = document.querySelectorAll('.left ul li');
    for (let i = 0; i < liList.length; i++) {
        (function (index) {
            liList[i].addEventListener('click', function () {
                console.log(this.offsetHeight);
                
                var translateY = -index * this.offsetHeight;
                var min = parentH - childrenH;
                // console.log(min);
                if (translateY < min) {
                    translateY = min;
                }
                swiperWrapper.style.transform = 'translate3d(0,' + translateY + 'px,0)';
                swiperWrapper.style.transition = 'all .3s';
                for (var j = 0; j < liList.length; j++) {
                    liList[j].classList.remove('active')
                }
                this.classList.add('active');
            })
        })(i);

        // liList[i].addEventListener('click', function () {
        //     var translateY = -this.dataset.index * this.offsetHeight;
        //     var min = parentH - childrenH;
        //     // console.log(min);
        //     if (translateY < min) {
        //         translateY = min;
        //     }
        //     swiperWrapper.style.transform = 'translate3d(0,' + translateY + 'px,0)';
        //     swiperWrapper.style.transition = 'all .3s';
        //     for (var j = 0; j < liList.length; j++) {
        //         liList[j].classList.remove('active')
        //     }
        //     this.classList.add('active');
        // })
    }
})(window)