/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * 序列化成字符串。深度优先，先存根节点，再存左右节点。空值用 @@@ 替换
 */
const nullNode = '@@@';
const serialize = function (root) {
  if (root === null) {
    return nullNode;
  }
  return [root.val, serialize(root.left), serialize(root.right)].join(',');
};

/**
 * 反序列化。
 */
let index = 0;
const deserialize = function (str) {
  const valArr = str.split(',');
  index = 0;
  const rootNode = createNode(valArr);
  return rootNode;
};

function createNode(valArr) {
  const value = valArr[index];
  index++; // 创建一个节点，往后挪一位。
  if (value === nullNode) {
    return null;
  }
  const node = new TreeNode(value);
  node.left = createNode(valArr);
  node.right = createNode(valArr);
  return node;
}
