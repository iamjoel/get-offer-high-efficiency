/*
 * 缓存整个链表的节点。链表移动到最后一个节点，再反回来。
 */
const reverseList = function (head) {
  if (!head) {
    return head;
  }
  const arr = [];
  let length = 1;
  let last;
  let newList;
  while (head) {
    arr.push(head);
    if (!head.next) {
      last = head;
      newList = last;
      break;
    }
    head = head.next;
    length++;
  }
  for (let i = 0; i < length; i++) {
    last.next = arr[length - i - 1];
    last = last.next;
  }
  last.next = null;
  return newList;
};
