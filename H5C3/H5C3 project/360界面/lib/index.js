// 如果是写在js文件里，建议大家写一个入口函数
$(function(){

    $('#itcast').fullpage({
        // 显示导航
        navigation:true,
        // 每一屏的背景颜色
        sectionsColor:['#00bfff','#9acd32','#ffa500','#008000','#87ceeb'],

        // 当某一屏滚出会触发的回调函数
        afterLoad:function(a,index){

            // console.log(index);
            // 不好的原因：是因为无论你滚出第几屏，它把所有屏都加了animation
            // 例如页面一打开访问的是第一屏，那么你在页面一打开的时候所有屏上都加了animation，就代表动画在此刻都要走完，所以你再滚到下一页的时候就没有动画
            // $('.section1').addClass('animation');
            // $('.section2').addClass('animation');

            //解决办法：谁滚出来才给谁加animation
            //eq方法传入下标代表可以找到第几个，那么index是滚出来的屏数，从1开始，所以用index-1就能得到它对应的索引
            $('.section').eq(index-1).addClass('animation').siblings().removeClass('animation');
            
        }
    });

})


