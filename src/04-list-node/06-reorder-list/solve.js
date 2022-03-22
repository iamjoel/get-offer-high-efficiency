/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/*
* 1 -> 2 -> 3 -> 4 -> 5 => 1 -> 5 -> 2 -> 4 -> 3
* 
* 1. 将链表一分为二。如果链表长度是技术。1 -> 2 -> 3; 4 -> 5
* 2. 反转后半部分。4 -> 5 => 5 -> 4
* 3. 把反转的后半部分，嵌入前半部分。
*/
const reorderList = function (head) {
  if (!head || !head.next || !head.next.next) {
    return head;
  }
  let { prevHalf, afterHalf } = divideToHalf(head);
  afterHalf = reverseList(afterHalf);
  while (prevHalf) {
    const prevHalfNext = prevHalf.next;
    prevHalf.next = afterHalf;
    if (afterHalf) {
      // 奇数到末尾的情况
      const afterHalfNext = afterHalf.next;
      afterHalf.next = prevHalfNext;
      afterHalf = afterHalfNext;
    }
    prevHalf = prevHalfNext;
  }
  return head;
};

// 用快慢指针来实现。快指针一次走两步，慢指针一次走一步。快指针走到链表末尾时，慢指针指向的就是中间节点。
// 节点树至少为3.
function divideToHalf(head) {
  let fast = head;
  let slow = head;
  let middle = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    middle = slow;
    slow = slow.next;
  }
  const isOdd = !!fast;
  let afterHalf;
  if (isOdd) {
    // 奇数
    afterHalf = slow.next;
    slow.next = null;
  } else {
    afterHalf = middle.next;
    middle.next = null;
  }
  return {
    prevHalf: head,
    afterHalf,
  };
}

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
