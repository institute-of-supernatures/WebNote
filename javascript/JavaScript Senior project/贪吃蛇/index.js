/*
** Create by Allen on 2018/12/25
*/
// 关于食物的代码
;(function (window) {
    var list = [];
    // 创建食物的构造函数
    function Food ( width, height, bgc, x, y ) {
        this.width = width || 16;
        this.height = height || 16;
        this.bgc = bgc || 'gold';
        this.x = x || 0;
        this.y = y || 0;
    };
    // 食物原型对象
    /**
     * 原型对象构造食物
     * @param map ： 地图元素
     */
    Food.prototype.render = function (map) {
        // 删除旧食物
        remove(map);
        // 创建一个div元素充当食物
        var div = document.createElement('div');
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.bgc;
        div.style.borderRadius = (this.width/4)+'px';
        // 定位方式：绝对定位
        div.style.position = 'absolute';
        // 向下取整（随机数 * （地图宽度 / 食物宽度））*食物宽度
        this.x = Math.floor(Math.random()*(map.offsetWidth/this.width))*this.width ;
        this.y = Math.floor(Math.random()*(map.offsetHeight/this.height))*this.height ;
        div.style.left = this.x+ 'px';
        div.style.top = this.y+ 'px';
        map.appendChild(div);

        // 把显示食物的div保存起来
        list.push(div);
    }
    // 删除旧食物
    function remove(map){
        for ( var i = 0 ; i < list.length ; i ++ ) {
            map.removeChild(list[i]);
        }
        // 清空数组
        list.length = 0;
    }

    // 把Food的方法添加给window对象
    // window是全局对象，所以可以再外部访问
    window.Food = Food;

}(window));

// ----------------------------------------------

// 关于蛇的代码
;(function (window) {
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

//---------------------------------------------

// 游戏控制器（所有关于游戏逻辑的代码）
;(function ( window ) {
    // 用来存放游戏控制器变量
    var that = null;
    // 游戏控制器构造函数
    function Game (map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    // 开始游戏的方法
    Game.prototype.start = function () {
        // 显示食物和蛇
        this.food.render(this.map);
        this.snake.render(this.map);
        console.log ( this.food );
        // 让蛇动起来
        var start = id('start');
        start.onclick = function () {
            sankeAutoMove();
        }
        // 键盘移动
        bindKey();
    }
    function bindKey (  ) {
        document.onkeydown = function ( e ) {
            e = e || window.event;
            // 37 左 38 上 39 右 40 下
            switch ( e.keyCode ) {
                case 37:
                    if ( this.snake.direction != "right" ) {
                        this.snake.direction = 'left';
                    }
                    break;
                case 38:
                    if ( this.snake.direction != "bottom" ) {
                        this.snake.direction = 'top';
                    }
                    break;
                case 39:
                    if ( this.snake.direction != "left" ) {
                        this.snake.direction = 'right';
                    }
                    break;
                case 40:
                    if ( this.snake.direction != "top" ) {
                        this.snake.direction = 'bottom';
                    }
                    break;
            }
        }.bind(that);
    }
    function sankeAutoMove () {
        var timeID = setInterval(function (  ) {
            // 这里的this是window，因为this是由window调用的
            this.snake.move(this.food,this.map);

            // 判断蛇是否出了边界
            var snakeHeadx = this.snake.body[0].x * this.snake.width;
            var snakeHeady = this.snake.body[0].y * this.snake.height;
            // 判断
            if ( snakeHeadx < 0 || snakeHeady < 0 || snakeHeadx >= this.map.offsetWidth || snakeHeady >= this.map.offsetHeight ) {
                alert('Game Over!');
                clearInterval(timeID);
                return; // 超出边界，停止执行渲染蛇代码
            }
            // 渲染蛇
            this.snake.render(this.map);
        }.bind(that),100) // that 替换上述this为游戏控制器this
    }
    window.Game = Game;
}(window));

// 如果一个js文件放入页面上有多个自调用函数，则在前面加个分号