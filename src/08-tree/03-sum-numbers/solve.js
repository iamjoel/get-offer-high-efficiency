/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 深度遍历。
 */
const sumNumbers = function(root) {
  return sumNode(root, 0);
};

function sumNode(node, prevValue) {
  if(node === null) {
    return 0;
  }
  const currValue = prevValue * 10 + node.val
  // 已经是叶子节点
  if(node.left === null && node.right === null) {
    return currValue;
  }
  return sumNode(node.left, currValue) + sumNode(node.right, currValue);
};
