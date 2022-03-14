/**
 * hashmap 来存节点的位置。 节点用双向链表来存储，方便删除。
 */
const LRUCache = function (capacity) {
  this.capacity = capacity;
  this.len = 0;
  // head, tail 是哨岗节点，方便插入和删除，不需要判断是否为空。
  this.head = new ListNode(-1, -1);
  this.tail = new ListNode(-1, -1);
  this.head.next = this.tail;
  this.tail.prev = this.head;
  this.hashmap = {}; // 存储节点在链表中的位置。
};

LRUCache.prototype.get = function (key) {
  const node = this.hashmap[key];
  if (!node) {
    return -1;
  }
  moveToTail(node, this.tail);
  return node.val;
};

LRUCache.prototype.put = function (key, value) {
  let node = this.hashmap[key];
  // 新增
  if (!node) {
    if (this.capacity === this.len) {
      const removeKey = removeFromHead(this.head);
      delete this.hashmap[removeKey];
      this.len--;
    }
    node = new ListNode(key, value);
    insertToTail(node, this.tail);
    this.hashmap[key] = node;
    this.len++;
  } else {
    // 更新
    node.val = value;
    moveToTail(node, this.tail);
  }
};

class ListNode {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

function moveToTail(node, tail) {
  // 移除
  node.prev.next = node.next;
  node.next.prev = node.prev;
  // 插入
  insertToTail(node, tail);
}

function insertToTail(node, tail) {
  const prevNode = tail.prev;
  node.prev = prevNode;
  node.next = tail;
  prevNode.next = node;
  tail.prev = node;
  debugger
}

function removeFromHead(head) {
  let removeKey = head.next.key;
  head.next = head.next.next;
  head.next.prev = head;
  return removeKey;
}

// const cache = new LRUCache(2);
// cache.put(1,1);
// cache.put(2,2);
// console.log(cache.get(1))
// cache.put(3,3);
// console.log(cache.get(2))
// cache.put(4,4);
// console.log(cache.get(3))
// console.log(cache.get(4))
