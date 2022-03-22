/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
const CBTInserter = function (root) {
  this.root = root;
  this.list = [root]; // 存有位置子节点的节点
  let curr;
  while (this.list[0].left !== null && this.list[0].right !== null) {
    curr = this.dequeue();
    this.enqueue(curr.left);
    this.enqueue(curr.right);
  }
};

CBTInserter.prototype.insert = function (v) {
  const parentNode = this.list[0];
  const node = new TreeNode(v);
  if (parentNode.left === null) {
    parentNode.left = node;
  } else {
    parentNode.right = node;
    this.dequeue();
    this.enqueue(parentNode.left);
    this.enqueue(parentNode.right);
  }
  return parentNode.val;
};

/**
 * @return {TreeNode}
 */
CBTInserter.prototype.get_root = function () {
  return this.root;
};

CBTInserter.prototype.enqueue = function (t) {
  this.list.push(t);
};

CBTInserter.prototype.dequeue = function () {
  return this.list.shift();
};
