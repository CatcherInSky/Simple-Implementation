

  

// 函数原型方法
Function.prototype.call2 = function(context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args +')');

  delete context.fn;
  return result;
};
Function.prototype.apply2 = function(context, arr) {
  var context = context || window;
  context.fn = this;

  var result;
  if(!arr) {
    result = context.fn();
  } else {
    var args = [];
    for(var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')');
  }

  delete context.fn;
  return result;
};
Function.prototype.bind2 = function(context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function() {};

  var fBound = function() {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

Function.prototype.bind_ = function (obj) {
    //第0位是this，所以得从第一位开始裁剪
    var args = Array.prototype.slice.call(arguments, 1);
    var fn = this;
    return function () {
        //二次调用我们也抓取arguments对象
        var params = Array.prototype.slice.call(arguments);
        //注意concat的顺序
        fn.apply(obj, args.concat(params));
    };
};


// new 关键字
function new2(Con, ...args) {
  let obj = {}
  Object.setPrototypeOf(obj, Con.prototype)
  let result = Con.apply(obj, args)
  return result instanceof Object ? result : obj
}

// instanceof 
function instanceof(obj, fn) {
  let proto = obj.__proto__ 
  while(proto) {
    if(fn.prototype === proto) return true;
    proto = obj.__proto__
  }
  return false
}
