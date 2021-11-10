// 优先队列

q = new PriorityQueue();
q.enqueue(1,1);
q.enqueue(2);
q.enqueue(3);
q.enqueue(4, 2);
q.value;
// 4 1 2 3

l = new CircleLinkedList();
Array.from({length: 10}, (_, index) => l.append(index));
l.insert(6, 11);
l.values();
l.removeAt(3);


l = new MaxHeap();
Array.from({length: 10}, (_, index) => l.insert(index));

graph = new Graph();
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
myVertices.forEach((v) => {
  graph.addVertex(v);
});
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

graph.values();

graph.breadthFirstSearch('A', console.log);
graph.depthFirstSearch('A', console.log)
Array.prototype.reduce.call(new Set([1,2,3]), (acc, cur) => {
  console.log(acc, cur);
  return acc + cur;
},5);



hash = new LikedHashTable();
hash.set('Gandalf', 'gandalf@emai.com');
hash.set('John', 'johnsnow@email.com');
hash.set('Tyrion', 'tyrion@email.com');
hash.set('Gandalf', 'gandalf@email.com');
hash.set('John', 'johnsnow@email.com');
hash.set('Tyrion', 'tyrion@email.com');
hash.set('Aaron', 'aaron@email.com');
hash.set('Donnie', 'donnie@email.com');
hash.set('Ana', 'ana@email.com');
hash.set('Jonathan', 'jonathan@email.com'); // 5
hash.set('Jamie', 'jamie@email.com'); // 5
hash.set('Mindy', 'mindy@email.com');
hash.set('Paul', 'paul@email.com');
hash.set('Nathan', 'nathan@email.com');
console.log(hash.values());

hash = new LinarHashTable();
hash.set('Gandalf', 'gandalf@emai.com');
hash.set('John', 'johnsnow@email.com');
hash.set('Tyrion', 'tyrion@email.com');
hash.set('Gandalf', 'gandalf@email.com');
hash.set('John', 'johnsnow@email.com');
hash.set('Tyrion', 'tyrion@email.com');
hash.set('Aaron', 'aaron@email.com');
hash.set('Donnie', 'donnie@email.com');
hash.set('Ana', 'ana@email.com');
hash.set('Jonathan', 'jonathan@email.com'); // 5
hash.set('Jamie', 'jamie@email.com'); // 5
hash.set('Mindy', 'mindy@email.com');
hash.set('Paul', 'paul@email.com');
hash.set('Nathan', 'nathan@email.com');
console.log(hash.values());


hash.set('Sue', 'sue@email.com'); // 5