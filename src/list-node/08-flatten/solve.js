/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * 递归处理。
 * 遍历链表，遇到有child的，把下一个丢入栈中。将 child 转成双向列表。继续遍历。
 * 遍历完，取栈中的元素，将，丢在最后面。直到栈为空。
 */
 const flatten = function (head) {
  if (!head) {
    return head;
  }
  const stack = [];
  let currNode = head;
  let lastNode = null;
  while (currNode) {
    if (currNode.child) {
      stack.push(currNode.next);
      currNode.next = flatten(currNode.child);
      currNode.child.prev = currNode;
      currNode.child = null;
    }
    lastNode = currNode;
    currNode = currNode.next;
  }
  while (stack.length) {
    const node = stack.pop();
    if (node) {
      lastNode.next = flatten(node);
      node.prev = lastNode;
    }
  }
  return head;
};