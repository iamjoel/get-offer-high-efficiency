/**
 * // Definition for a Node.
 * function Node(val, next) {
 *     this.val = val;
 *     this.next = next;
 * };
 */

/**
 * 1. 遍历一圈。找max节点。
 * 2. 插入大于等于最大值或小于等于最小值，都插入到最大值或最小值的中间。
 * 3. 因为是升序的，最小节从最小节点遍历起，一定能找到插入的节点。
 */
const insert = function (head, insertVal) {
  const insertNode = new Node(insertVal);
  // 没有节点的情况
  if (!head) {
    insertNode.next = insertNode;
    return insertNode;
  }
  // 一个节点的情况
  if (head.next === head) {
    insertNode.next = head;
    head.next = insertNode;
    return head;
  }
  // 两个节点的情况
  if (head.next.next === head) {
    if (insertVal > head.next.val || insertVal < head.val) {
      insertNode.next = head;
      head.next.next = insertNode;
    } else {
      let temp = head.next;
      head.next = insertNode;
      insertNode.next = temp;
    }

    return head;
  }

  let max = Number.MIN_VALUE;
  let min = Number.MAX_VALUE;
  const firstNode = head;
  let beforeNode = firstNode;
  let currNode = beforeNode.next;
  let nextNode = currNode.next;
  let maxNode;
  let beforeMaxNode;
  // 转一圈
  while (currNode.next !== firstNode.next) {
    const currMax = Math.max(currNode.val, nextNode.val);
    const currMin = Math.min(currNode.val, nextNode.val);
    // 可能会存在多个最大值相同的情况。不加等号会出问题。
    if (currMax >= max) {
      max = currMax;
      beforeMaxNode = currNode.val >= nextNode.val ? beforeNode : currNode;
      maxNode = beforeMaxNode.next;
    }
    if (currMin < min) {
      min = currMin;
    }
    beforeNode = beforeNode.next;
    currNode = currNode.next;
    nextNode = nextNode.next;
  }

  // 太多或太小，插大最大节点的后面
  const isTooBigOrSmall = insertVal >= max || insertVal <= min;
  if (isTooBigOrSmall) {
    const beforeInsertNode = maxNode;
    insertNode.next = beforeInsertNode.next;
    beforeInsertNode.next = insertNode;
    return head;
  }

  // 从最小节点转一圈，一定找得到插入的点
  currNode = maxNode.next;
  nextNode = currNode.next;
  while (currNode.next !== maxNode.next) {
    if (currNode.val <= insertVal && nextNode.val >= insertVal) {
      currNode.next = insertNode;
      insertNode.next = nextNode;
      return head;
    }
    currNode = currNode.next;
    nextNode = nextNode.next;
  }
};
