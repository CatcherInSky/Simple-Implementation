/**
 * 发布订阅模式
 */
export class Bus {
  constructor() {
    this.collector = new Map();
  }
  $on(name, event) {
    let fns = this.collector.get(name) || [];
    this.collector.set(name, fns.push(event) && fns);
  }
  $emit(name, ...args) {
    let fns = this.collector.get(name) || [];
    if(fns.length > 0) {
      fns.forEach(fn => {
        fn.apply(this, args);
      });
    } else {
      throw Error(`event ${name} does not exist`);
    }
  }
  $off(name, event) {
    let fns = this.collector.get(name);
    if(fns && fns.length > 0) {
      fns = fns.filter(fn => fn.name != event);
      fns.length > 0 ? this.collector.set(name, fns) : this.collector.delete(name);
    } else {
      throw Error(`event ${name} does not exist`);
    }
  }
}
// const bus = new Bus();