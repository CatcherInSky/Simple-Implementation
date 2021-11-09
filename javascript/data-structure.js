// 运用数组和对象方法

// 栈 后进先出
class Stack {
  constructor() {
    this.value = [];
  }
  // 增
  push(value) {
    return this.value.push(value);
  }
  // 删
  pop() {
    return this.value.pop();
  }
  clear() {
    this.value = [];
  }
  // 查
  size() {
    return this.value.length;
  }
  isEmpty() {
    return !this.value.length;
  }
}
// 队列 先进先出
class Queue {
  constructor() {
    this.value = [];
  }
  // 增
  enqueue(value) {
    return this.value.push(value);
  }
  // 删
  dequeue() {
    return this.value.shift();
  }
  clear() {
    this.value = [];
  }
  // 查
  size() {
    return this.value.length;
  }
  isEmpty() {
    return !this.value.length;
  }
}
class PriorityQueue extends Queue {
  constructor() {
    super();
  	this.Element = class Element {
    	constructor(value, priority) {
        // 不输入默认最低优先级
        this.value = value;
        this.priority = priority;
      }
    };
  }
  // 优先级规则
  superior(a = 0, b = 0) {
    return a > b;
  }
  enqueue(value, priority) {
    const {value: queue, Element, superior} = this;
  	let element = new Element(value, priority);
    let index = queue.findIndex(item => superior(item.priority, priority));
    typeof index === 'number' ? queue.splice(index, 0, element) : queue.push(element);  
  }
  dequeue() {
    const res = this.value.shift();
    return res && res.value; 
  }
}
function hotPotato(list, num) {
  let queue = new Queue();
  list.forEach(item => queue.enqueue(item));
  while(queue.size() > 1) {
  	for(let i = 0; i < num; i++) {
    	queue.enqueue(queue.dequeue());
    }
    // 完成一轮淘汰一个
    queue.dequeue();
  }
  // 剩下最后一个queue.data[0]
  return queue.dequeue();
}

// 集合
class _Set {
  constructor() {
    // 对象不允许一个键指向两个不同的属性，保证了集合里的元素都是唯一的
    this.value = {};
  }
  // 增
  add(value) {
    if(this.has(value)) {
      return false;
    } else {
      // 同时作为键和值保存方便检索
      this.value[value] = value; // 也可以使用深拷贝来跟WeakSet区分
      return true;
    }
  }
  // 删
  remove() {
    if(this.has(value)) {
      delete this.value[value];
      return true;
    } else {
      return false;
    }
  }
  clear() {
    this.value = {};
  }
  // 查
  has(value) {
    return this.hasOwnProperty(value);
  }
  size() {
    return Object.keys(this.value).length;
  }
  values() {
    return Object.values(this.value);
  }
  // 并集
  union(otherSet) {
    const unionSet = new _Set();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }
  // 交集
  intersection(otherSet) {
    const intersectionSet = new _Set();
    this.values().forEach(value => otherSet.has(value) && intersectionSet.add(value));
    return intersectionSet;
  }
  // 差集
  difference(otherSet) {
    const differenceSet = new _Set();
    this.values().forEach(value => otherSet.has(value) || intersectionSet.add(value));
    return differenceSet;
  }
  // 子集
  subset(otherSet) {
    this.size() > otherSet.size()
      ? false
      : this.values().every(value => otherSet.has(value));
  }
}
// 字典 Dictionary
class _Map {
  constructor() {
    // 对象不允许一个键指向两个不同的属性，保证了集合里的元素都是唯一的
    this.value = {};
  }
  // 增
  set(key, value) {
    this.value[key] = value; // 也可以使用深拷贝来跟WeakMap区分
  }
  // 删
  delete(key) {
    if(this.has(key)) {
      delete this.value[key];
      return true;
    } else {
      return false;
    }
  }
  clear() {
    this.value = {};
  }
  // 查
  has(key) {
    this.value.hasOwnProperty(key);
  }
  get(key) {
    return this.has(key) ? this.value[key] : undefined;
  }
  size() {
    return this.keys().length;
  }
  keys() {
    return Object.values(this.value);
  }
  values() {
    return Object.values(this.value);
  }
}
// 散列表
class HashTable {
  constructor() {
    this.value = [];
  }
  // 函数名啥意思？
  loseloseHashCode(key) {
    let hash = 0;
    for(let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;  //取模意味着这个数据结构最多存放 36 个元素
  }
  // 增
  set(key, value) {
  	this.value[this.loseloseHashCode(key)] = value;
  }
  // 删
  delete(key) {
    if(this.has(key)) {
      delete this.value[this.loseloseHashCode(key)];
      return true;
    } else {
      return false;
    }
  }
  // 查
  get(key) {
  	return this.has(key) && this.value[this.loseloseHashCode(key)];
  }
  has(key) {
    this.value.hasOwnProperty(this.loseloseHashCode(key));
  }
}
// 分离链接
class LikedHashTable extends HashTable {
  constructor() {
    super();
    this.Node = class Node {
    	constructor(key, value) {
      	this.key = key;
        this.value = value;
      }
    };
    // 自定义链表的findPosition方法
    this._LinkedList = class _LinkedList extends LinkedList {
    	findPosition(key) {
        let current = this.head, index = -1;
        while(current) {
          // 只能对比基本类型和地址相同的引用类型
          if(current.value.key === key) {
            return index + 1;
          }
          index ++;
          current = current.next;
        }
        return index;
      }
    };
  }
  // 增
  set(key, value) {
    const {Node, _LinkedList} = this;
    const element = this.value[this.loseloseHashCode(key)];
    this.has(key) || (element = new _LinkedList());
    element.append(new Node(key, value));
  }
  // 删
  delete(key) {
    const element = this.value[this.loseloseHashCode(key)];
    return element
      ? element.remove(key)
    	: false;
  }
  // 查
  get(key) {
    const element = this.value[this.loseloseHashCode(key)];
    return element.find(element.findIndex(key));
  }
  has(key) {
    return !!this.get(key);
  }
}
// 线性探查
class LinarHashTable extends HashTable {
  constructor() {
    super();
    this.Node = class Node {
    	constructor(key, value) {
      	this.key = key;
        this.value = value;
      }
    };
  }
  // 增
  set(key, value) {
    const {Node} = this;
    let position = this.loseloseHashCode(key);
    while(this.value[position] !== undefined) {
      position ++;
    }
  	this.value[position] = new Node(key, value);
  }
  // 删
  delete(key) {
    const position = this.findPosition(key);
    if(position !== -1) {
      // 不需要把后面的递补上来？
      this.value[position] = undefined;
      return true;
    } else {
      return false;
    }
  }
  // 查
  get(key) {
    const position = this.findPosition(key);
    return position === -1
      ? undefined
      : this.value[position].value
  }
  findPosition(key) {
    const {value, loseloseHashCode} = this;
    let position = loseloseHashCode(key);
    while(value[position] !== undefined && value[position].key !== key) {
      position ++;
    }
    const element = value[position];
    return element 
      ? position
      : -1;
  }
  has(key) {
    return !!this.get(key);
  }
}
// 链表
class LinkedList {
  constructor() {
    // 基本结构
    this.Node = class Node {
      constructor(value, next) {
        this.value = value;
        this.next = next;
      }
    };
    this.head = null;
    this.length = 0; 
  }
  // 查位置
  findPosition(value) {
    let current = this.head, index = -1;
    while(current) {
      // 只能对比基本类型和地址相同的引用类型
      if(current.value === value) {
        return index + 1;
      }
      index ++;
      current = current.next;
    }
    return current ? index : -1;
  }
  // 查值
  find(position) {
  	if(position < 0 || position > this.length - 1) {
      return undefined;
    }
    if(position === 0) {
      return this.head;
    } else {
    	let current = this.head, previous, index = 0;
      while(index ++ < position) {
        previous = current;
        current = current.next;
      }
      return current;
    }
  }
  // 增
  // 递归寻找末端
  append(value) {
    return this.insert(this.length, value);
  }
  insert(position, value) {
    const {Node} = this;
    if(position < 0 || position > this.length) {
      // 溢出
      return false;
    }
    const node = new Node(value);
    if(position === 0) {
    	const current = this.head;
      node.next = current;
      this.head = node;
    } else {
      // 0 1 2 在1位置插入3 -> 0 3 1 2?
      const previous = this.find(position - 1), current = previous.next;
      node.next = current;
      previous.next = node;
    }
    this.length ++;
    return true;
  }
  // 删
  removeAt(position) {
    if(position < 0 || position > this.length) {
      // 溢出
      return null;
    }
    if(position === 0) {
      const current = this.head;
      this.head = current.next;
      this.length --;
      return current;
    } else {
      const previous = this.find(position - 1), current = previous.next;
      previous.next = current.next;
      this.length --;
      return current;
    }
  }
  remove(value) {
    return this.removeAt(this.findPosition(value));
  }
  size() {
    return this.length;
  }
  isEmpty() {
    return !this.length;
  }
  // 改
  update(position, value) {
    if(position < 0 || position > this.length) {
      // 溢出
      return false;
    }
    const node = this.find(position);
    if(node) {
      node.value = value;
      return true;
    } else {
      return false;
    }
  }
}
// 双向链表
class DoublyLinkedList extends LinkedList{
  constructor() {
    super();
    this.Node = class Node {
      constructor(value, prev, next) {
        this.value = value;
        this.next = next;
        this.prev = prev;
      }
    };
    this.head = null;
    this.tail = null;
    this.length = 0; 
  }
  connet(previous, next) {
    previous.next = next;
    next.prev = previous;
  }
  insert(position, value) {
    const { head, tail, length, Node, connet, find} = this;   
    if(position < 0 || position > length) {
      // 溢出
      return false;
    }
    const node = new Node(value);
    if(position === 0) {
      // 添加在开头有两种情况
      if(this.length === 0) {
        // 空链表
        this.tail = node;
        this.head = node;
      } else {
        // 有值的链表
        connet(node, head)
        this.head = node;
      }
    } else if(position === length) {
      // 添加在末尾
      connet(tail, node);
      this.tail = node
    } else {
      // 0 1 2 在1位置插入3 -> 0 3 1 2?
      const current = find(position), previous = current.prev;
      connet(previous, node)
      connet(node, current)
    }
    this.length ++;
    return true;
  }
  removeAt(position) {
    if(position < 0 || position > this.length) {
      // 溢出
      return null;
    }
    const {head, tail, length, connet} = this;
    if(position === 0) {
      this.head = head.next;
      if(length === 1) {
        this.tail = head.next;
      } else {
        this.head.prev = null;
      }
      this.length --;
      return head;
    } else if(position === length - 1) {
      this.tail = tail.prev;
      this.tail.next = null;
      this.length --;
      return tail
    } else {
      const current = find(position), previous = current.prev;
      connet(previous, current.next)
      this.length --;
      return current
    }
  }
}
// 循环链表
class CircleLinkedList extends DoublyLinkedList {
  constructor() {
    super();
  }
  circle() {
    const {head, tail} = this;
    head.prev = tail;
    tail.next = head;
  }
  insert(position, value) {
    const { head, tail, length, Node, connet, find, circle} = this;   
    if(position < 0 || position > length) {
      // 溢出
      return false;
    }
    const node = new Node(value);
    if(position === 0) {
      // 添加在开头有两种情况
      if(this.length === 0) {
        // 空链表
        this.tail = node;
        this.head = node;
      } else {
        // 有值的链表
        connet(node, head)
        this.head = node;
      }
      circle()
    } else if(position === length) {
      // 添加在末尾
      connet(tail, node);
      this.tail = node
      circle()
    } else {
      // 0 1 2 在1位置插入3 -> 0 3 1 2?
      const current = find(position), previous = current.prev;
      connet(previous, node)
      connet(node, current)
    }
    this.length ++;
    return true;
  }
  removeAt(position) {
    if(position < 0 || position > this.length) {
      // 溢出
      return null;
    }
    const {head, tail, length, connet, circle} = this;
    if(position === 0) {
      this.head = head.next;
      if(length === 1) {
        this.tail = head.next;
      } else {
        this.head.prev = null;
      }
      this.length --;
      circle()
      return head;
    } else if(position === length - 1) {
      this.tail = tail.prev;
      this.tail.next = null;
      this.length --;
      circle()
      return tail
    } else {
      const current = find(position), previous = current.prev;
      connet(previous, current.next)
      this.length --;
      return current
    }
  }
}

// 二叉树
class Tree {
  constructor() {
    this.Node = class Node {
      constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
      }
    };
    this.root = null;
  }
  // 中序遍历
  inOrderTraverse(callback) {
    const inOrderTraverseNode = (node, callback) => {
      if(node !== null) {
        inOrderTraverseNode(node.left, callback);
        callback(node.value);
        inOrderTraverseNode(node.right, callback);
      }
    };
    inOrderTraverseNode(this.root, callback);
  }
  // 前序遍历
  preOrderTraverse(callback) {
    const preOrderTraverseNode = (node, callback) => {
      if(node !== null) {
        callback(node.value);
        preOrderTraverseNode(node.left, callback);
        preOrderTraverseNode(node.right, callback);
      }
    };
    preOrderTraverseNode(this.root, callback);
  }
  // 后序遍历
  postOrderTraverse(callback) {
    const postOrderTraverseNode = (node, callback) => {
      if(node !== null) {
        postOrderTraverseNode(node.left, callback);
        postOrderTraverseNode(node.right, callback);
        callback(node.value);
      }
    };
    postOrderTraverseNode(this.root, callback);
  }
}
// 二叉搜索树
class BinarySearchTree extends Tree {
  constructor() {
  	super();
  }
  // 增
  insert(value) {
    const {Node} = this;
    const insertNode = (tree, node) => {
      if(!tree) {
        return node;
      }
      if(node.value > tree.value) {
        tree.right = insertNode(tree.right, node);
      } else {
        tree.left = insertNode(tree.left, node);
      }
      return tree;
    };
    this.root = insertNode(this.root, new Node(value));
  }
  // 查
  min() {
    let temp = this.root;
    while(temp) {
      temp = temp.left;
    }
    return temp;
  }
  max() {
    let temp = this.root;
    while(temp) {
      temp = temp.right;
    }
    return temp;
  }
  search(value) {
    const searchNode = (node, value) => node === null 
      ? null
      : (
        node.value === value 
          ? node
          :  searchNode(node.value > key ? node.left: node.right, key)
      );
    return searchNode(this.root, value);
  }
}
// 堆是一种特殊的 完全二叉树 ，完全二叉树意味着每个节点都有两个孩子节点。
// JS 通常用数组来表示堆。
// ● 左侧节点的位置是 2*index+1 。
// ● 右侧节点的位置是 2*index+2 。
// ● 父节点位置是 (index - 1) / 2 。
class Heap {
  constructor() {
    this.heap = [];
  }
  // 判断函数
  judge() {
    return false;
  }
  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
    // (i - 1) >> 1
  }
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  // 上移操作
  shiftUp(index) {
    if(index === 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if(this.judge(parentIndex, index)) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if(this.judge(index, leftIndex)) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if(this.judge(index, rightIndex)) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  // 值插入堆的底部 然后上移
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  // 删除堆顶 用数组尾部元素替换堆顶（因为直接删除堆顶会破坏堆结构）, 然后下移
  shift() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }
  // 变成树
  tree() {
    class Node {
      constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
      }
    };
    const map = new Map();
    let head = null;
    this.heap.forEach((value, index) => {
      const node = new Node(value);
      map.set(index, node);
      let father = Math.floor((index - 1) / 2);
      if(father < 0) {
        head = node;
      } else {
        const position = father === (index - 1) / 2 ? 'left' : 'right';
        map.get(father)[position] = node;
      }
    });
    return head;
  }
}

// 最大堆 所有子节点小于父节点
class MaxHeap extends Heap {
  constructor() {
    super();
  }
  judge(a, b) {
    return this.heap[a] < this.heap[b];
  }
}
// 最小堆 所有子节点大于父节点
class MinHeap extends Heap {
  constructor() {
    super();
  }
  judge(a, b) {
    return this.heap[a] > this.heap[b];
  }
}

// 图
class Graph {
  constructor() {
    this.vertices = new Set(); // 顶点 可用Set会不方便遍历？
    this.adjList = new Map(); // 边
  }
  // 添加新顶点
  addVertex(v) {
    // if(!this.vertices.has(v)) {
    this.vertices.add(v);
    this.adjList.has(v) || this.adjList.set(v, []);
    // }
  }
  // 添加a,b顶点之间的边
  addEdge(a, b) {
    // 如果图中没有顶点a，先添加顶点a
    !this.adjList.has(a) && this.addVertex(a);
    // 如果图中没有顶点b，先添加顶点b
    !this.adjList.has(b) && this.addVertex(b);

    this.adjList.get(a).push(b); // 在顶点a中添加指向顶点b的边
    this.adjList.get(b).push(a); // 在顶点b中添加指向顶点a的边
  }
  initHistory(vertices) {
    // 0 未访问 1 已访问未探索 2 已探索
    const map = new Map();
    vertices.forEach(v => map.set(v, 0));
    return map;
  }
  // 广度优先 BFS 队列 将图的顶点存入队列中，最先入队列的顶点先被探索
  breadthFirstSearch(start, callback) {
    const {vertices, adjList} = this, 
      history = this.initHistory(vertices), 
      queue = new Queue();

    queue.enqueue(start);
    while(!queue.isEmpty()) {
      let v = queue.dequeue();
      adjList.get(v).forEach(u => {
        if(history.get(u) === 0) {
          history.set(u, 1);
          queue.enqueue(u);
        }
      });
      history.set(v, 2);
      callback(v);
    }
  }
  // 深度优先 DFS 栈 将图的顶点存入栈中，顶点是沿着路径被探索的，存在新的相邻顶点就去访问
  depthFirstSearch(start, callback) {
    const {vertices, adjList} = this, 
      history = this.initHistory(vertices), 
      stack = new Stack();
    
    stack.push(start);
    while(!stack.isEmpty()) {
      let v = stack.pop();
      adjList.get(v).forEach(u => {
        if(history.get(u) === 0) {
          history.set(u, 1);
          stack.push(u);
        }
      });
      history.set(v, 2);
      callback(v);
    }
  }
}