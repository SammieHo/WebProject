#Math.random()随机数的一些事一些情

###一、预备知识 
####Math()
```
Math.ceil();  //向上取整。

Math.floor();  //向下取整。

Math.round();  //四舍五入。

Math.random();  //[0,1) 之间的一个伪随机数。

Math.ceil(Math.random()*10);  // 获取从1到10的随机整数 ，取0的概率极小。

Math.round(Math.random());   //可均衡获取0到1的随机整数。

Math.floor(Math.random()*10);  //可均衡获取0到9的随机整数。

Math.round(Math.random()*10);  //基本均衡获取0到10的随机整数，其中获取最小值0和最大值10的几率少一半。
//因为结果在0~0.4 为0，0.5到1.4为1...8.5到9.4为9，9.5到9.9为10。所以头尾的分布区间只有其他数字的一半。
```
####Date()
```
var d = new Date();

var n = d.getSeconds(); //生成0到59的随机数

var n1 = d.getMilliseconds(); //生成0到999的随机数

var n2 = d.getMilliseconds() % 201; //生成0到200的随机数
//除了取 Date 的秒和微秒外，还可以取小时和分钟（跟取秒生成的随机数相同）。
```
####String()
```
String.toString() //返回用字符串表示的特定对象

String.substr(start[, length]) //返回字符串中从指定位置开始到指定长度的子字符串

String.substring(indexStart[, indexEnd]) //返回字符串两个索引之间（或到字符串末尾）的子串

RegExp

字母ASCII码:A-65,a-97
```
