// webpack 编译后变量名会被修改 函数相互引用存在问题
export const add = (a,b) => {
  var r1,r2,m;   
  try {
    r1 = a.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }   
  try {
    r2 = b.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }   
  m = Math.pow(10,Math.max(r1,r2));   
  return div(mul(a,m) + mul(b,m) , m);
};  
// 减法   
export const sub = (a,b) => { 
  return add(a,-b);
};
// 乘法   
export const mul = (a,b) => {  
  a = Number(a);
  b = Number(b);
  if( !a || !b ) {
    return 0;
  }
  var m = 0,s1 = a.toString(),s2 = b.toString();   
  try {
    m += s1.split('.')[1].length;
  } catch (e) {
    1;
  }   
  try {
    m += s2.split('.')[1].length;
  } catch (e) {
    1;
  }   
  return (Number(s1.replace('.','')) * Number(s2.replace('.','')) / Math.pow(10,m));
}; 

// 除法
export const div = (a,b) => {
  a = Number(a);
  b = Number(b);
  if( !a || !b ) {
    return 0;
  }
  var t1 = 0,t2 = 0,r1,r2;   
  try {
    t1 = a.toString().split('.')[1].length;
  } catch (e) {
    1;
  }   
  try {
    t2 = b.toString().split('.')[1].length;
  } catch (e) {
    1;
  }   
  r1 = Number(a.toString().replace('.',''));   
  r2 = Number(b.toString().replace('.',''));   
  if(r2 === 0) {
    return 0;
  }
  return (r1 / r2) * Math.pow(10,t2 - t1);
};

export const random = (arr, p = 2) => {
  const [min, max] = arr.map(it => Number(it)).sort((a,b) => a - b);
  return Number((Math.random() * (max - min) + min).toFixed(p));
};