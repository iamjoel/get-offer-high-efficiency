/*
* 1. 将链表一分二。如果链表长度是奇数个，去掉中间节点。
* 2. 反转后半部分链表，然后比较前后两部分是否相等。
*/
const isPalindrome = (head) => {
  if (!head || !head.next) {
    return true;
  }
  let { prevHalf, afterHalf } = divideToHalf(head);
  afterHalf = reverseList(afterHalf);
  while (prevHalf) {
    if (prevHalf.val !== afterHalf.val) {
      return false;
    }
    prevHalf = prevHalf.next;
    afterHalf = afterHalf.next;
  }
  return true;
};

function divideToHalf(head) {
  let fast = head;
  let slow = head;
  let prevSlow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    prevSlow = slow;
    slow = slow.next;
  }
  const isOdd = !!fast;
  let afterHalf;
  if (isOdd) {
    // 奇数， 跳过中间节点
    afterHalf = slow.next;
    prevSlow.next = null;
  } else {
    // 偶数
    afterHalf = prevSlow.next;
    prevSlow.next = null;
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