/**
 * 
 * 针对localStorage进行安全，时效性等方面的补强
 * 
 */

export class LocalStorage {
  constructor({
    // 允许的键范围，空则不限制
    include,
    // 不允许的键范围，空则不限制
    exclude,
    // 加密函数
    encode = value => value, 
    // 解密函数
    decode = value => value,
  } = {}) {
    this.encode = encode;
    this.decode = decode;
    this.key_allow = (key) => {
      if(Array.isArray(include)) {
        return include.includes(key);
      }
      if(Array.isArray(exclude)) {
        return !exclude.includes(key);
      }
      return true;
    };
  }
  // 检查localstorage 是否已满
  isQuotaExceeded(e) {  
    var quotaExceeded = false;
    if(e) {
      if(e.code) {
        switch (e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014:
          // Firefox
          if(e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true;
          }
          break;
        }
      } else if(e.number === -2147024882) {
        // Internet Explorer 8
        quotaExceeded = true;
      }
    }
    return quotaExceeded;
  }
  // 默认一周过期， null为不限期
  $set({ key, value, expire = 1000 * 60 * 60 * 24 * 7 }) {
    if(this.key_allow(key)) {
      try {
        localStorage.setItem(encode(key), encode(JSON.stringify({
          value,
          expire,
          date: Date.now()
        })));
      } catch (err) {
        if(this.isQuotaExceeded(err)) {
          window.console.log('localStorage 已满！');
        } else {
          window.console.log(err);
        }
      }
    } else {
      window.console.log(`${key}不在可设置范围`);
    }
  }
  $get(key) {
    if(this.key_allow(key)) {
      let ls = localStorage.getItem(encode(key));
      if(ls) {
        const { value, expire, date } = JSON.parse(decode(ls));
        if(expire === null || date + expire >= Date.now()) {
          return value;
        } else {
          localStorage.removeItem(itemKey);
          window.console.log(`${key}已过期`);
        }
      }
    } else {
      window.console.log(`${key}不在可设置范围`);
    }
    return undefined;
  };
}

