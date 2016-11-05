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

String.slice(beginSlice[, endSlice]) //浅复制，提取字符串并返回新字符串

RegExp

字母ASCII码:A-65,a-97
```

###二、应用

> 产生10个随机数

```
var arr = [],r;
for(var i=0;i<10;i++){
	r = (Math.random()/(new Date()-0)).toString(36).replace(/\d/g,'').slice(1);
	arr[i] ? (arr[i]+=1) : (arr[i]=r);
}
```

> 长度为5的随机数

```
for (var c = ''; c.length < 5;) {
	c += Math.random().toString(36).substr(2,1)
}
```

> 利用字母ASCII码[65,97]，生成长度为x的随机数

```
function rand(x) {

	var s = "";

	while (s.length < x && x > 0) {
		var r = Math.random();
		s += String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65));
	}

	return s;
}
rand(x);
```

> 生成指定范围随机数

```
Math.floor(Math.random() * (上限 - 下限 + 1) + 下限);

Math.ceil(Math.random() * (上限 - 下限) + 下限);

parseInt(Math.random() * (上限 - 下限 + 1) + 下限);

//under：上限; over：下限; ceil
function getRandom(under, over) {
	switch (arguments.length) {
		case 1:
			return Math.ceil(Math.random() * under);
		case 2:
			return Math.ceil(Math.random() * (over - under) + under);
		default:
			return 0;
	}
}
```

< 随机背景色

//方1
'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

//方2
"#"+("000000"+Math.floor(Math.random()*16777216).toString(16)).substr(-6);

//方3
function randomColor(){
  var r=function(){return Math.floor(Math.random()*256)};
  return "rgb("+r()+","+r()+","+r()+")";
}

< 洗牌算法
```
var i = 0,
	data = [],
	r;

for (; i < 10; data[i++] = i);

while (--i) {

	r = Math.round(Math.random() * 9 + 1) - 1;
	data[i] = data[i] + data[r], data[r] = data[i] - data[r], data[i] = data[i] - data[r];
}
console.log(data)
```
< 或者利用Array.prototype.sort()函数，这里可以不把里面的数值带进来运算。
< 首先Math.random()会生成一个[0,1)之间的数值，用0.5这个比较公平的数值减去它，概率得到小于0，等于0,大于0三种状况，而Array.prototype.sort()期待的数值恰好是[-1,0,1]，是不是很省事。

```
var i = 0,
	data = [],
	r;

for (; i < 10; data[i++] = i);

data.sort(function() {

	return .5 - Math.random();

});
```