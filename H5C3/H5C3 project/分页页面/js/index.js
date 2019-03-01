$(function () {

    $('#cartBox').fullpage({

        navigation: true,
        sectionsColor: ['#f9dd67', '#84a2d4', '#ef674d', '#ffeedd', '#cf4759', '#85d9ed', '#8ac060', '#84d9ed'],
        afterLoad: function (a, index) {

            //先清掉所有的animation
            $('.section').removeClass('animation');

            //谁滚出来都给谁加一个类叫animation
            $('.section').eq(index - 1).addClass('animation');

            // 不管谁滚出来，都无条件把第二屏的动画样式去掉
            // 因为jquery的动画加的是行内的样式，只要把行内样式情调，它就自然而然只能用默认的css样式了就相当于还原了
            $('.section2 .search').attr('style','').attr('src','images/02/search01.png');
            $('.section2 .sofas').attr('style','');


      
            $('.section6>div>div').stop().attr('style','');
            $('.section6').stop().css('backgroundPositionX','20%');
            $('.section6>div img').stop().attr('style','');


            // 如果是第二屏滚出来
            if (index == 2) {

                // jquery.easing，可以实现很多运动曲线，那样就不用自己写剧本
                $('.section2 .search').animate({

                    right: 530,
                }, 1000, 'easeOutBack', function () {

                    //动画结束调用的回调函数
                    //在这里换图片
                    $('.section2 .search').attr('src', 'images/02/search02.png').delay(500).animate({

                        bottom: 450,
                        right: 370,
                        height: 30
                    }, 1000);

                    //同时修改沙发的宽高
                    $('.section2 .sofas').delay(500).animate({

                        width: 441,
                        height: 218
                    }, 1000);

                });


            }else if(index == 4){

                $('.section4 .carBox').animate({

                    marginLeft:1000,

                },2000,'easeInElastic',function(){

                    $('.section4 .keyboard').animate({
                        opacity:1
                    },500);
                });

            }else if(index == 6){

                // 盒子先下来
                $('.giftBox').animate({

                    marginBottom:100
                },1000);


                //让车子动起来：其实动的是背景图片的位置
                $('.section6').delay(1000).animate({

                    backgroundPositionX:-1250
                   
                },3500,function(){

                    // 把男人放大
                    $('.man').animate({
                        height:140

                    },1000);

                    //把男人往右边走，但是注意要等放大完成后再走
                    //如果给同一个元素加animate属性，相当于是排队执行的，动画队列   
                    $('.man').animate({

                        right:-150

                    },1000,function(){

                        //当人走完后，要显示出门
                        $('.door').show();

                        //延迟执行
                        setTimeout(function(){
                            $('.girl').show();
                        },500);
                    
                    });

                });
            }

            // mouseover搭配mouseout
            // mouseenter搭配mouseleave
            $('.section8 .begin').mouseover(function(){

                $(this).attr('src','images/08/begin.gif');
            });

            // 移出事件
            $('.section8 .begin').mouseout(function(){

                $(this).attr('src','images/08/begin.png');
            });


            // 再来一次的点击事件
            $('.section8 .again').click(function(){

                //fullpage自带了一个跳转到某一屏去的方法
                $.fn.fullpage.moveTo(1);
            });



            $('.section8').mousemove(function(e){

                e = e || window.event;

                $('.section8 .hand').css('left',e.pageX - 65);
                $('.section8 .hand').css('top',e.pageY);
    
            })

        }
    });
})