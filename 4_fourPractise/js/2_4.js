/*
参考以下示例代码，用户输入城市名称和空气质量指数后，点击“确认添加”按钮后，就会将用户的输入在进行验证后，添加到下面的表格中，新增一行进行显示

1.验证输入，表格新增一行

用户输入的城市名必须为中英文字符，空气质量指数必须为整数

用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）

用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）

用户可以点击表格列中的“删除”按钮，删掉那一行的数据
*/
var f = function(id){
	return document.getElementById(id);
}
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	// 1.去掉空格
	var city = f("aqi-city-input").value.trim();
	var aqi = f("aqi-value-input").value.trim();

	// 2.判断match()正则表达式
	if(!city.match(/[A-z\u4E00-\u9FA5]/g)){
		alert("城市名必须为中英文字符！");
		return;
	}
	if(!aqi.match(/\d/g)){
		alert("空气质量指数必须为整数！");
		return;
	}

	// 3.添加对象
	aqiData[city] = aqi;
	//console.log(aqiData);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

	f("aqi-table").innerHTML = "";

	// 1.判断aqiData里有无数据，再判断表格里有没有节点
	for(var city in aqiData){
		if(f("aqi-table").children.length === 0){
			//创建表头
			console.log("1");
			f("aqi-table").innerHTML += "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
		}
		// 插入数据
		// var tr = document.createElement("tr");
		// var td1 = document.createElement("td");
		// td1.innerHTML = city;
		// tr.appendChild(td1);

		// var td2 = document.createElement("td");
		// td2.innerHTML = aqi[city];
		// tr.appendChild(td2);

		// var td3 = document.createElement("td");
		// td3.innerHTML = "<button>del</button>";
		// tr.appendChild(td3);

		// f("aqi-table").appendChild(tr);

		f("aqi-table").innerHTML += "<tr><td>" + city +"</td><td>"+ aqiData[city] + "</td><td><button>del</button></td></tr>"
	}
	
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(a) {   

  // do sth.
  var t = a.parentNode.parentNode.firstChild.innerHTML;
  // var strCity = tr.children[0].innerHTML;
  // console.log(t);
  delete aqiData[t];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  f("add-btn").onclick = addBtnHandle;

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  f("aqi-table").addEventListener("click",function(e){
  	if ( e.target.nodeName === "BUTTON") {
		// console.log(e.target.innerHTML);
		delBtnHandle(e.target);  		
  	}  	
  });
}

f("aqi-value-input").onkeyup = function(event){
	if (event.keyCode == 13) {
		addBtnHandle();
	}
};

init();

/*
	新技能GET√

	·判断字符是否是汉字的两种方法

	1.正则表达式 regExp
	2.Unicode字符范围（汉子编码>255）

	·对象的用法

	·obj.children 获取obj下的节点

	·for...in 语句循环遍历对象的属性

	 循环中的代码块将针对每个属性执行一次

	 var person={fname:"Bill",lname:"Gates",age:56};

	 for (x in person)
	   {
	   txt=txt + person[x];
	   }
	 //txt输出: BillGates56

	·target 事件属性
	 可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。

	 语法：event.target

	·exec() 是正则表达式的方法，【参数才是字符串】

	·test() 检测一个字符串是否匹配某个模式.

	·match() 

		字符串内检索指定的值，或找到一个或多个正则表达式的匹配
		字符串执行匹配正则表达式规则的方法
		【参数是正则表达】

	exec和match返回的都是数组

*/