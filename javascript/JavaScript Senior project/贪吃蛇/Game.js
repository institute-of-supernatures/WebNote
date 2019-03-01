/*
** Create by Allen on 2018/12/25
*/

// 游戏控制器（所有关于游戏逻辑的代码）
(function ( window ) {
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