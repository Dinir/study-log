/*
 insert, get, hash methods will be here.
 the hash function will use `charCodeAt()`.

 the method `retrieveAll()` is made independently.
 */

function HashTable(size) {
  this.buckets = Array(size);
  this.numBuckets = this.buckets.length;
}

function HashNode(key, value, next) {
  this.key = key;
  this.value = value;
  this.next = next || null;
}

HashTable.prototype.hash = function(key) {
  let total = 0;
  for(let i = 0; i < key.length; i++) {
    total += key.charCodeAt(i);
  }
  return total % this.numBuckets;
};

HashTable.prototype.insert = function(key, value) {
  const index = this.hash(key);
  console.log("INDEX:", index);
  // bucket is empty, so insert the new node
  if(!this.buckets[index]) {
    this.buckets[index] = new HashNode(key, value);
    return;
  }
  // if the bucket is already filled, check if it should be updated instead
  // check if the first node in the bucket need to be updated instead
  if(this.buckets[index].key === key) {
    this.buckets[index].value = value;
    return;
  }
  // first node has different key. check the every other node in the bucket
  let currentNode = this.buckets[index];
  // check the next node of the current one so we can check the last node
  // it leaves the first node unchecked, so we check the node in the bracket above
  while(currentNode.next) {
    // check if a node should be updated instead
    if(currentNode.next.key === key) {
      currentNode.next.value = value;
      return;
    }
    currentNode = currentNode.next;
  }
  // the node to add is new, so add the node to the bucket
  currentNode.next = new HashNode(key, value);
};

HashTable.prototype.get = function(key) {
  const index = this.hash(key);
  if(!this.buckets[index]) return null;
  let currentNode = this.buckets[index];
  // not like `insert` node, we check current node here,
  // because the method is to retrieve an information from the current node,
  // not inserting new node to the next of it.
  while(currentNode) {
    if(currentNode.key === key) return currentNode.value;
    currentNode = currentNode.next;
  }
  return null;
};

HashTable.prototype.retrieveAll = function() {
  const data = [];
  for(let index = 0; index < this.numBuckets; index++) {
    if(!this.buckets[index]) continue;
    let currentNode = this.buckets[index];
    while(currentNode) {
      // data.push(currentNode);
      data.push({key: currentNode.key, value: currentNode.value});
      currentNode = currentNode.next;
    }
  }
  return data;
};

const myHT = new HashTable(30);

// insert nodes
myHT.insert("Dean", "dean@gmail.com");
myHT.insert("Megan", "megan@gmail.com");
myHT.insert("Dane", "dane@yahoo.com");
myHT.insert("Joe", "joey@facebook.com");
myHT.insert("Samantha", "sammy@twitter.com");
// update the nodes
myHT.insert("Dean", "deanmachine@gmail.com");
myHT.insert("Megan", "megansmith@gmail.com");
myHT.insert("Dane", "dane1010@outlook.com");
// retrieve the values of the nodes
// console.log(myHT.get("Dean"));
// console.log(myHT.get("Megan"));
// console.log(myHT.get("Dane"));

console.log(myHT.retrieveAll());