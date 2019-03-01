/*
** Create by Allen on 2018/12/25
*/

// 关于食物的代码
(function (window) {
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