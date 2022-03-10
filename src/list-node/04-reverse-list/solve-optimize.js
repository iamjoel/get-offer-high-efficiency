/*
 * 缓存当前节点的前一个节点。
 */
const reverseList = function (head) {
  if (!head) {
    return head;
  }
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};

