/**
 * utils
 */
import moment from 'moment';
const utils = {
  /**
   * 获取页面宽度
   * @return {[type]} [description]
   */
  pageWidth: function () {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  },
  /**
   * 获取页面高度
   * @return {[type]} [description]
   */
  pageHeight: function () {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  },
  /**
   * 根据参数名获取URL数据
   * @param  {[type]} name [description]
   * @param  {[type]} url  [description]
   * @return {[type]}      [description]
   */
  getParameterByName: function (name, url) {
    if (!url)
      url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results)
      return null;
    if (!results[2])
      return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  /**
   * 获取图片的Base64格式
   * @param  {[type]}   img      [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getBase64: function (img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  },
  /**
   * 百分比转换
   * @param  {[type]} num       [description]
   * @param  {[type]} precision [description]
   * @return {[type]}           [description]
   */
  percent: function (num, precision) {
    if (!num || num === Infinity)
      return 0 + '%';
    if (num > 1)
      num = 1;
    precision = precision
      ? precision
      : 2;
    precision = Math.pow(10, precision);
    return Math.round(num * precision * 100) / precision + '%'
  },
  getCssText: function (object) {
    var str = "";
    for (var attr in object) {
      str += attr + ":" + object[attr] + ";";
    }
    return str;
  },
  // 获取时间范围
  getTimeRange(time){
    let now = new Date();
    now.setTime(now.getTime()-24*60*60*1000);
    let d = now.getDate();
    let m = now.getMonth()+1;
    let y = now.getFullYear();
    let ly = '',lm='',lmt='',mt='',ld='',lmd;
    let str = ''
    if(time == '6'){
      let now180 = new Date();
      now180.setTime(now180.getTime()-181*24*60*60*1000);
      ld = now180.getDate();
      lm = now180.getMonth();
      ly = now180.getFullYear();
      // return `${ly}-${lmt}-${d}至${y}-${mt}-${d}`;
    }else if(time == '9'){
      // 最近90天
      let now90 = new Date();
      now90.setTime(now90.getTime()-91*24*60*60*1000);
      ld = now90.getDate();
      lm = now90.getMonth()+1;
      ly = now90.getFullYear();
    }
    else if(time == '1'){
      // 昨天
      let now1 = new Date();
      now1.setTime(now1.getTime()-24*60*60*1000);
      ld = now1.getDate();
      lm = now1.getMonth()+1;
      ly = now1.getFullYear();
      mt = m >=10 ? m :'0' + m;
      lmd =d >=10 ? d :'0' + d;
      return `${y}-${mt}-${lmd}`;
    }
    else if(time == 'thisYear'){
      // 今年以来
      let now1 = new Date();
      now1.setTime(now1.getTime()-24*60*60*1000);
      ld = now1.getDate();
      lm = now1.getMonth()+1;
      ly = now1.getFullYear();
      mt = m >=10 ? m :'0' + m;
      lmd =d >=10 ? d :'0' + d;
      // if(lm=='1'&&ld=='1'){
      //     ly = now1.getFullYear() - 1;
      //     y = now.getFullYear() - 1;
      // }
      return `${ly}-01-01至${y}-${mt}-${lmd}`;
    }
    lmt =lm >=10 ? lm :'0' + lm;
    mt = m >=10 ? m :'0' + m;
    lmd =d >=10 ? d :'0' + d;
    return `${ly}-${lmt}-${lmd}至${y}-${mt}-${lmd}`;
  },
  /**
   * 去除空串
   */
  trim: function (str) {
    return typeof str === 'string'
      ? str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
      : str;
  },
  // 选择月份的时候回带-，把-去掉
  trimLine: function (str) {
    return typeof str === 'string'
      ? str.replace('-', '').replace('/', '')
      : str;
  },
  // 如果日期为6、4位，加-
  addLine:function (str) {
    str = (str+'');
    if(str.length==8){
      let s1 = str.substring(0,4);
      let s2 = str.substring(4,6);
      let s3 = str.substring(6,8);
      return s1+'-'+s2+'-'+s3;
    }else if(str.length==6){
      let s1 = str.substring(0,4);
      let s2 = str.substring(4,6);
      return s1+'-'+s2;
    }else{
      return str
    }
  },
  // html代码在浏览器解析成文本
  htmlEncode: function (str) {
    var div = document.createElement("div");
    div.innerHTML = str;
    return div.innerHTML;
  },
  // main tab导航
  affixTab: function ($traget, top, topHeight) {
    var _width = $(".main-right").width() -0;
    if ($traget.scrollTop() >= (top - topHeight)) {
      //页面滚动到导航 让占位div显示 affix-tab fixed
      $(".affix-tab-placeholder").show();
      $(".affix-tab").css({'position': 'fixed', 'top': topHeight, 'width': _width})
    } else {
      $(".affix-tab-placeholder").hide();
      $(".affix-tab").css({'position': 'relative', 'top': '0'})
    }
  },
  // 把对象中所有数组转成字符串
  objarrToString: (obj) => {
    for (const i in obj) {
      if (typeof obj[i] === 'object' && obj[i].constructor === Array) {
        obj[i] = obj[i].toString();
      };
    };
    return obj;
  },
  // 深拷贝
  deepCopy: (p, c) => {
    c = c || [];
    for (const i in p) {
      if (typeof p[i] === 'object') {
        c[i] = (p[i].constructor === Array)
          ? []
          : {};
        this.deepCopy(p[i], c[i]);
      } else {
        c[i] = p[i];
      };
    };
    return c;
  },
  // 判断小对象p内容是否跟大对象c中的值一样
  deepCompare: (p, c) => {
    if ( p === c ) {
      return true;
    };
    // 如果不是数组或对象
    if ( ! ( p instanceof Object ) || ! ( c instanceof Object ) ) {
      return false;
    };
    // 如果构造原型不一样
    if ( p.constructor !== c.constructor ) {
      return false;
    };
    for (const i in p) {
      if (typeof p[i] === 'object') {
        deepCompare(p[i], c[i]);
      } else {
        if(c[i] !== p[i]) {
          return false;
        };
      };
    };
    return true;
  },
  //判断是否是函数
  isFunction:(arg) => {
    if (arg) {
      if (typeof (/./) !== 'function') {
        return typeof arg === 'function';
      } else {
        return Object.prototype.toString.call(arg) === '[object Function]';
      }
    }
    return false;
  },
  //浮点减法
  numSub:(arg1, arg2) => {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },
  //浮点加法
  numAdd:(arg1, arg2) => {
    var r1, r2, m, c;
    try {
      r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
      r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      var cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", "")) * cm;
      } else {
        arg1 = Number(arg1.toString().replace(".", "")) * cm;
        arg2 = Number(arg2.toString().replace(".", ""));
      }
    } else {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
  },
  //浮点乘法
  accMul:(arg1, arg2) => {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
      m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },
  //返回昨天的日期并格式化（如2010-01-10）
  getYesterday:()=>{
    return moment().subtract(1, 'days').format('YYYY-MM-DD')
  },
  //返回当前年月（如201003）
  getNowDate:()=>{
    let date = new Date();
    let nowMonth = date.getMonth() + 1;
    //月份格式处理
    if (nowMonth >= 1 && nowMonth <= 9) {
      nowMonth = "0" + nowMonth;
    }
    return date.getFullYear() + nowMonth;
  },
  // 变成千分位
  toThousands:(num) =>{
    return (num || 0).toString().replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','));
  },
  //防抖函数
  debounceFunc:(func, wait, immediate) => {
    var timeout, result;
    var debounced = function () {
      var context = this;
      var args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        // 如果已经执行过，不再执行
        var callNow = !timeout;
        timeout = setTimeout(function(){
          timeout = null;
        }, wait)
        if (callNow) result = func.apply(context, args)
      }
      else {
        timeout = setTimeout(function(){
          func.apply(context, args)
        }, wait);
      }
      return result;
    };
    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };
    return debounced;
  },
  // 星星小数大于5设置为5
  starToFive:(value)=>{
    if(value!=0){
      console.log(value,'hhh');
      let a = value + '';
      console.log(a);
      let b = a.split('.')[0];
      let c = a.split('.')[1];
      if(parseFloat(c)>=5){
        return parseFloat(b +'.'+ 5)
      }else{
        return parseFloat(b +'.'+ 0)
      }
    }else{
      return 0
    }
  }
}
export default utils
