/*
** Create by Allen on 2018/12/25
*/
// 关于蛇的代码
(function (window) {
    // list用来存放每一个蛇身体代表的div
    var list = [];
    function Snake(width,height,direction){
        this.width = width || 16;
        this.height = height || 16;
        this.direction = direction || "right";
        // 蛇的每一节身体存在数组中
        this.body = [
            { x: 3, y: 1, bgc: 'skyblue', r:4 },
            { x: 2, y: 1, bgc: 'pink' },
            { x: 1, y: 1, bgc: 'skyblue' }
        ];
    };
    // 渲染蛇
    Snake.prototype.render = function (map) {
        // 删除旧蛇
        remove(map);

        for ( var i = 0 ; i < this.body.length ; i ++ ) {
            // 获取蛇的每一节身体信息
            var snakeUnit = this.body[ i ];
            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.backgroundColor = snakeUnit.bgc;
            div.style.borderRadius = snakeUnit.r +'px';
            // 求出蛇每一节身体的坐标
            div.style.left = ( this.width  *  snakeUnit.x ) +'px';
            div.style.top = ( this.height  *  snakeUnit.y ) +'px';
            map.appendChild(div);

            // 保存div
            list.push(div);
        };
    };
    // 蛇移动
    Snake.prototype.move = function ( food,map ) {
        // 身体，从尾部开始改坐标
        for ( var i = this.body.length - 1 ; i > 0 ; i -- ) {
            this.body[ i ].x = this.body[ i - 1 ].x;
            this.body[ i ].y = this.body[ i - 1 ].y;
        }
        // 头
        switch ( this.direction ) {
            case "left":
                    this.body[ 0 ].x --;
                break;
            case "right":
                this.body[ 0 ].x ++;
                break;
            case "top":
                this.body[ 0 ].y --;
                break;
            case "bottom":
                this.body[ 0 ].y ++;
                break;
        }
        // 判断是否吃到食物
        var snakeHeadx = this.body[0].x * this.width;
        var snakeHeady = this.body[0].y * this.height;
        var foodX =  food.x;
        var foodY =  food.y;
        console.log ( foodX );
        // 获取蛇尾（蛇添加的方块就是原来蛇尾的的坐标）
        var snakeLastUnit = this.body[this.body.length-1];
        // 判断坐标是否重合
        if ( snakeHeadx == foodX && snakeHeady == foodY ) {
            // 吃到了食物，给蛇对象的body数组添加一个元素
            this.body.push ({
                x:snakeLastUnit.x,
                y:snakeLastUnit.y,
                bgc: '#df00c5'
            });
            // 产生一个新的食物
            food.render(map);
        }
        // 随机产生16进制的颜色
        function getColor(){
            var arr = ['0','1','3','4','5','6','7','8','9','a','b','c','d','e','f'];
            var str = "#";
            for ( var i = 0 ; i < 6 ; i ++ ) {
                var num = Math.floor(Math.random()*16);
                str += arr[num];
            }
            return str;
        }
    }
    // 删除旧蛇的方法
    function remove(map){
        // 让map移除数组中的div
        for ( var i = 0 ; i < list.length ; i ++ ) {
            map.removeChild(list[i]);
        }
        // 重新清空数组
        list.length = 0;
    }

    window.Snake = Snake;
}(window));
