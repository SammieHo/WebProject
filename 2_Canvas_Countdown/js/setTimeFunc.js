// 全局
var WINDOW_WIDTH = document.body.clientWidth;
var WINDOW_HEIGHT = document.body.clientHeight;
var RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;
var MARGIN_TOP = 60;
var MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);

// 截止时间
//注意：月份是0开始
// var endTime = new Date(2016, 9, 24, 3, 0, 0); 

var endTime = new Date();
var setEndDate = endTime.getDate();
var setEndHours = endTime.getHours();
if (setEndHours > 3) {
    endTime.setDate(setEndDate + 1);
    endTime.setHours(3, 0, 0);
}

// 倒计时一小时后
// endTime.setTime(endTime.getTime()+3600*1000);
// console.log(endTime.getHours());

// 初始化 现在离截止时间 0
var curShowTimeSeconds = 0;

// 小球数组
var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];

// init
(function() {

    // 初始化canvas
    var canvas = document.getElementById('canvas');
    // 使用context绘制，获取上下文
    var context = canvas.getContext('2d');

    // 浏览器的视口，不包括工具栏和滚动条
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    // 对curShowTimeSeconds进行计算
    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(

        // 表每一帧动作
        function() {

            // 绘制当前Canvas画布
            render(context);
            // 对当前数据更新
            update();
        },
        50
    );

})();

function update() {

    // 1.时间变化
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    if (nextSeconds != curSeconds) {

        // 判断变化位数
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
        }

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }

    // 更新小球变化
    updateBalls();
}

function updateBalls() {

    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        // 碰撞检测
        if (balls[i].y >= (WINDOW_HEIGHT - RADIUS)) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.756;
        }
    }

    // 小球数量优化
    var count = 0;
    for (var i = 0; i < balls.length; i++) {
        if ((balls[i].x + RADIUS) > 0 && (balls[i].x - RADIUS < WINDOW_WIDTH)) {
            balls[count++] = balls[i];
        }
    }
    while (balls.length > count) {
        balls.pop();
    }
    // console.log(count);
}

function addBalls(x, y, num) {

    //2. 变化时产生彩色小球生成
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                // 添加小球的位置
                // 生成随机数的方法
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }

                balls.push(aBall);
            }
        }
    }
}

function getCurrentShowTimeSeconds() {

    // 获取现在时间
    var curTime = new Date();
    // getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。
    var ret = endTime.getTime() - curTime.getTime();
    // 将ret 从ms -> s
    ret = Math.round(ret / 1000);

    return ret >= 0 ? ret : 0;
}

function render(cxt) {

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    // 绘制倒计时
    // 先获取当前时间
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;

    // 绘制数字
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

    // 遍历小球
    for (var i = 0; i < balls.length; i++) {

        cxt.fillStyle = balls[i].color;

        // 绘制小球
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, Math.PI * 2, true);
        cxt.closePath();

        cxt.fill();
    }

}

function renderDigit(x, y, num, cxt) {

    cxt.fillStyle = "rgb(0,102,153)";
    // cxt.strokeStyle = "red";

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, Math.PI * 2);
                cxt.closePath();

                cxt.fill();
            }
        }
    }
}
