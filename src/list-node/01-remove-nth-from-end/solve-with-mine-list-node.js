
/*
 * 保持前后两个指针之间保持 n 个节点，同步往后移动。当后指针达到链表尾部时，前指针指向倒数第 n 个节点。
 */
const removeNthFromEnd = function (head, n) {
  const len = head.length;
  if (n > len) {
    return head;
  }
  let firstNode = arrayToListNode(head);
  let beforeIndex = firstNode;
  let afterIndex = firstNode;
  for (let i = 0; i < n; i++) {
    afterIndex = afterIndex.next;
  }
  while (afterIndex && afterIndex.next) {
    afterIndex = afterIndex.next;
    beforeIndex = beforeIndex.next;
  }
  beforeIndex.next = beforeIndex.next ? beforeIndex.next.next : null;
  const res = nodeToArray(firstNode);
  return res;
};

// 数组转链表
function arrayToListNode(head) {
  if (!head || head.length === 0) {
    return null;
  }
  let lastNode = new ListNode(head[head.length - 1]);
  for (let i = head.length - 2; i >= 0; i--) {
    let node = new ListNode(head[i], lastNode);
    lastNode = node;
  }
  return lastNode;
}

function nodeToArray(firstNode) {
  let arr = [];
  while (firstNode) {
    arr.push(firstNode.val);
    firstNode = firstNode.next;
  }
  return arr;
}

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

console.log(removeNthFromEnd([1,2,3,4,5], 2))
console.log(removeNthFromEnd([1], 1))
console.log(removeNthFromEnd([1], 3))

