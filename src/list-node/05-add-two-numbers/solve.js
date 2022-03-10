/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 反转链表。再相加。最后一位如果大于10，则进位。
 * 求和过后，再转回来。
 */
const addTwoNumbers = function (l1, l2) {
  let { node: l1Reverse, length: l1Length } = reverseList(l1);
  let { node: l2Reverse, length: l2Length } = reverseList(l2);
  let longNode = l1Length >= l2Length ? l1Reverse : l2Reverse;
  let res = longNode;
  let carry = 0; // 进位
  while (longNode) {
    const sum =
      (l1Reverse ? l1Reverse.val : 0) + (l2Reverse ? l2Reverse.val : 0) + carry;
    const value = sum % 10;
    carry = sum >= 10 ? 1 : 0;

    longNode.val = value;
    if (!longNode.next) {
      break;
    }
    longNode = longNode.next;
    if (l1Reverse) {
      l1Reverse = l1Reverse.next;
    }
    if (l2Reverse) {
      l2Reverse = l2Reverse.next;
    }
  }
  if (carry) {
    longNode.next = new ListNode(1);
  }
  return reverseList(res).node;
};

const reverseList = function (head) {
  if (!head) {
    return { node: head, length: 0 };
  }
  let prev = null;
  let curr = head;
  let length = 1;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
    length++;
  }
  length--;
  return { node: prev, length };
};