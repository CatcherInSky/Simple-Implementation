
// 对象原型方法
Object.create2 = function(proto, propertyObject = undefined) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object or null.')
  if (propertyObject == null) {
      new TypeError('Cannot convert undefined or null to object')
  }
  function F() {}
  F.prototype = proto
  const obj = new F()
  if (propertyObject != undefined) {
      Object.defineProperties(obj, propertyObject)
  }
  if (proto === null) {
      // 创建一个没有原型对象的对象，Object.create(null)
      obj.__proto__ = null
  }
  return obj
}
Object.assign2 = function(target, ...source) {
  if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object')
  }
  let ret = Object(target) 
  source.forEach(function(obj) {
      if (obj != null) {
          for (let key in obj) {
              if (obj.hasOwnProperty(key)) {
                  ret[key] = obj[key]
              }
          }
      }
  })
  return ret
}

// https://juejin.cn/post/6946022649768181774