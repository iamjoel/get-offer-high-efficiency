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
const findBottomLeftValue = function (root) {
  if (!root) return null;
  if (!root.left && !root.right) return root.val;
  const levelLeftValue = [];
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
    if (levelLeftValue[level - 1] === undefined) {
      levelLeftValue[level - 1] = node.val;
    }

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

  // 取最后一个
  const res = levelLeftValue
    .filter((item) => item !== undefined)
    .slice(-1)[0];
  return res;
};