// 运用数组和对象方法

// 栈 后进先出
class Stack {
  constructor() {
    this.data = [];
  }
  push(value) {
    return this.data.push(value);
  }
  pop() {
    return this.data.pop();
  }
  size() {
    return this.data.length;
  }
  isEmpty() {
    return !this.data.length;
  }
  clear() {
    this.data = [];
  }
}
// 队列 先进先出
class Queue {
  constructor() {
    this.data = [];
  }
  enqueue(value) {
    return this.data.push(value);
  }
  shift() {
    return this.data.shift();
  }
  size() {
    return this.data.length;
  }
  isEmpty() {
    return !this.data.length;
  }
  clear() {
    this.data = [];
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
  size() {
    return this.length;
  }
  isEmpty() {
    return !this.length;
  }
  // 增
  // 递归寻找末端
  append(value) {
    const node = new this.Node(value);
    // 当前指针
    let current = null;
    if(this.head == null) {
      this.head = node;
    } else {
      current = this.head;
      while(current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length ++;
  }
  insert(position, value) {
    if(position < 0 || position > this.length) {
      // 溢出
      return false;
    }
    const node = new this.Node(value);
    let current = this.head, previous = null, index = 0;
    if(position === 0) {
      this.head = node;
      node.next = current;
    } else {
      while(index ++ < position) {
        previous = current;
        current = current.next;
      }
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
      return false;
    }
    let current = this.head, previous = null, index = 0;
    if(position === 0) {
      this.head = current.next;
    } else {
      while(index ++ < position) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.length --;
    return true;
  }
  remove(value) {
    return this.removeAt(this.find(value));
  }
  // 查
  find(value) {
    let current = this.head, index = -1;
    while(current) {
      // 只能对比基本类型和地址相同的引用类型
      if(current.value === value) {
        return index + 1;
      }
      index ++;
      current = current.next;
    }
    return -1;
  }
  // 改
  update(position, value) {
    if(position < 0 || position > this.length) {
      // 溢出
      return false;
    }
    const node = new this.Node(value);
    let current = this.head, previous = null, index = 0;
    if(position === 0) {
      node.next = current.next;
      this.head = node;
    } else {
      while(index ++ < position) {
        previous = current;
        current = current.next;
      }
      previous.next = node;
      node.next = current.next;
    }
    return true;
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
  insert(value) {
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
    this.root = insertNode(this.root, new this.Node(value));
  }
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
  constructor(arr) {
    const build = (arr) => {
      class Node {
        constructor(value) {
          this.value = value;
          this.left = null;
          this.right = null;
        }
      };
      const map = new Map();
      arr.forEach((value, index) => {
        const node = new Node(value);
        map.set(index, node)
        let father = Math.floor((index - 1) / 2)
        if(father < 0) {
          this.root = node
        } else {
          const position = father === (index - 1) / 2 ? 'left' : 'right'
          map.get(father)[position] = new Node(value)
        }
      })
    }
    this.root = build(arr);
  }
}
// 最大堆 所有子节点小于父节点
class MaxHeap {

}
// 最小堆 所有子节点大于父节点
class MinHeap {

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
  
  // 广度优先 BFS


  // 深度优先 DFS

}
// 集合
class _Set {

}
// 弱集合
class _WeekSet {

}
// 字典 Dictionary
class _Map {

}
// 弱字典
class _WeekMap {

}