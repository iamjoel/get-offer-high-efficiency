/**
 * // Definition for a Node.
 * function Node(val, next) {
 *     this.val = val;
 *     this.next = next;
 * };
 */

/**
  * 遍历一圈。找max节点。
  * 如果是从小找大的。从最小节点遍历起。否则，从最大节点遍历起。
  * 插入大于等于最大值或小于等于最小值，都插入到最大值或最小值的中间。
*/
const insert = function(head, insertVal) {
  if(!head) {
    return new Node(insertVal);
  }
  if(!head.next) {
    const insertNode = new Node(insertVal);
    insertNode.next = head;
    head.next = insertNode;
  }
  // 至少有三个节点。

  let max = Number.MIN_VALUE
  let min = Number.MAX_VALUE
  const firstNode = head
  let beforeNode = firstNode
  let currNode = beforeNode.next
  let nextNode = currNode.next
  let maxNode
  let beforeMaxNode
  // 转一圈
  while(currNode !== firstNode) {
    const currMax = Math.max(currNode.val, nextNode.val);
    const currMin = Math.min(currNode.val, nextNode.val);
    if(currMax > max) {
      max = currMax
      beforeMaxNode = currNode.val >= nextNode.val ? beforeNode : currNode
      maxNode = beforeMaxNode.nextNode
    }
    if(currMin < min) {
      min = currMin
    }
    beforeNode = beforeNode.next
    currNode = currNode.next
    nextNode = nextNode.next
  }

  // 算方向
  let dir = 'up'
  currNode = maxNode.next
  nextNode = currNode.next
  while(currNode !== maxNode) {
    if(currNode.val === nextNode.val) {
      continue;
    } else {
      dir = currNode.val > nextNode.val ? 'down' : 'up'
      break
    }
  }

  const isTooBigOrSmall = insertVal >= max || insertVal <= min
  if(isTooBigOrSmall) {
    const beforeInsertNode = dir === 'up' ? maxNode : beforeMaxNode
    const insertNode = new Node(insertVal)
    insertNode.next = beforeInsertNode.next
    beforeInsertNode.next = insertNode
    return head
  }

  // 一定找得到插入的点
  if (dir === 'down') {
    currNode = maxNode
    nextNode = currNode.next
    // TODO:
    while(nextNode !== maxNode) {
      if(currNode.val === nextNode.val) {
        continue;
      } else {
        const insertNode = new Node(insertVal)
        insertNode.next = beforeMaxNode.next
        beforeMaxNode.next = insertNode
        return head
      }
    }
  } else {
    currNode = maxNode.next
    nextNode = currNode.next
    // TODO:
    while(currNode !== maxNode) {
    }
  }


  // 转一圈结束
  // const insertNode = new Node(insertVal);
  // const afterMaxValueNode = beforeMaxValueNode.next;
  // beforeMaxValueNode.next = insertNode;
  // insertNode.next = afterMaxValueNode;
  return head;
};