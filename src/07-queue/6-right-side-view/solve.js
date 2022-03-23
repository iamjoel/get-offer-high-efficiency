/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 用广度优先遍历树，遍历时，传递层的信息。最左边的，不是指一定是左节点。
 */
const rightSideView = function(root) {
  if (!root) return [];
  if (!root.left && !root.right) return [root.val];
  const levelRightValue = [];
  const list = [
    {
      node: root,
      level: 1,
      isLeft: true,
    },
  ];
  let curr;
  while (list.length > 0) {
    curr = list.shift();
    const node = curr.node;
    const level = curr.level;
    levelRightValue[level - 1] = node.val;

    if (node.left) {
      list.push({
        node: node.left,
        level: level + 1,
      });
    }
    if (node.right) {
      list.push({
        node: node.right,
        level: level + 1,
      });
    }
  }

  return levelRightValue;
};