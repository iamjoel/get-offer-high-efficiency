/*
 * 快指针和慢指针。保持前后两个指针之间保持 n 个节点，同步往后移动。当后指针达到链表尾部时，前指针指向倒数第 n 个节点。
 * 注意： 这边的head 就是一个链表。只有 next 和 value 属性。 
 */
const removeNthFromEnd = function (head, n) {
  if (!head) {
    return head;
  }
  let len = 1;
  let slowIndex = head;
  let fastIndex = head;
  for (let i = 0; i < n; i++) {
    if (!fastIndex) {
      // 链表长度小于 n。
      return head;
    }
    fastIndex = fastIndex.next;
    if (fastIndex) {
      len++;
    }
  }
  if (len === n) {
    // 删除头节点。
    return head.next;
  }
  while (fastIndex && fastIndex.next) {
    fastIndex = fastIndex.next;
    slowIndex = slowIndex.next;
  }

  slowIndex.next = slowIndex.next ? slowIndex.next.next : null;
  return head;
};
