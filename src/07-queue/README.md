# 《剑指Offer：专项突破版》 - 队列部分 JavaScript 题解
《剑指Offer：专项突破版》是一个算法题集。该题单包含了程序员在准备面试过程中必备的数据结构与算法知识。具体包含：
- 数据结构：整数、数组、字符串、链表、栈、栈、队列、树、堆和前缀树。
- 算法：二分查找、排序、回溯法、动态规划和图搜索。 

本文来分享下队列部分题的解法~

## 队列介绍
> 队列是操作受限的数组。只能在数组的尾部插入元素，在数组的头部删除元素。它的特点是“先入先出”：先入队列的元素先出来。

基于 js 的数组，很容易实现队列：
```js
class Queue {
  constructor() {
    this.list = [];
    this.size = 0;
  }
  // 入队
  enqueue(item) {
    this.size++;
    this.list.push(item);
  }
  // 出队
  dequeue() {
    this.size--;
    return this.list.shift();
  }
}
```

## 题1 - 剑指 Offer II 041. 滑动窗口的平均值
> 题目：请实现如下类型MovingAverage，计算滑动窗口中所有数字的平均值，该类型构造函数的参数确定滑动窗口的大小，每次调用成员函数next时都会在滑动窗口中添加一个整数，并返回滑动窗口中所有数字的平均值。

[题的力扣地址](https://leetcode-cn.com/problems/qIsx9U/)

可以用队列来存滑动窗口的数据。添加整数时入队，超过窗口大小时出队。为了降低求平均值的时间复杂度，要缓存窗口数字的和。调用成员函数next时，`当前的和 = 缓存的和 + 入队的数字 - 出队的数字`。`平均值 = 当前的和 / 数字数量`。代码如下：

```js
const MovingAverage = function (size) {
  this.queue = new Queue();
  this.size = size;
  this.sum = 0;
};

MovingAverage.prototype.next = function (val) {
  if (this.queue.size === this.size) {
    this.sum -= this.queue.dequeue();
  }
  this.sum += val;
  this.queue.enqueue(val);
  const average = this.sum / this.queue.size;
  return average;
};
```

## 题2 - 剑指 Offer II 042. 最近请求次数
> 题目：请实现如下类型RecentCounter，它是统计过去3000ms内的请求次数的计数器。该类型的构造函数RecentCounter初始化计数器，请求数初始化为0；函数ping（int t）在时间t添加一个新请求（t表示以毫秒为单位的时间），并返回过去3000ms内（时间范围为[t-3000，t]）发生的所有请求数。假设每次调用函数ping的参数t都比之前调用的参数值大。

[题的力扣地址](https://leetcode-cn.com/problems/H8086Q/)

用队列来存之前的请求时间。当添加新的请求时:
1. 将新的请求时间和队列中的请求时间比较，超出时间范围的时间的出队。
2. 将新的请求时间入队。

代码如下：

```js
const PERIOD = 3000;
const RecentCounter = function () {
  this.list = [];
};

RecentCounter.prototype.ping = function (t) {
  while (t - this.list[0] > PERIOD) {
    this.dequeue();
  }
  this.enqueue(t);
  return this.list.length;
};

RecentCounter.prototype.enqueue = function (t) {
  this.list.push(t);
};

RecentCounter.prototype.dequeue = function () {
  return this.list.shift();
};
```

## 题3 - 剑指 Offer II 043. 往完全二叉树添加节点
> 题目：在完全二叉树中，除最后一层之外其他层的节点都是满的（第n层有2n-1个节点）。最后一层的节点可能不满，该层所有的节点尽可能向左边靠拢。例如，图7.3中的4棵二叉树均为完全二叉树。实现数据结构CBTInserter有如下3种方法。  
> ● 构造函数CBTInserter（TreeNode root），用一棵完全二叉树的根节点初始化该数据结构。
> ● 函数insert（int v）在完全二叉树中添加一个值为v的节点，并返回被插入节点的父节点。例如，在下图a所示的完全二叉树中添加一个值为7的节点之后，二叉树下图b所示，并返回节点3。在下图b所示的完全二叉树中添加一个值为8的节点之后，二叉树下图c所示，并返回节点4。在下图c所示的完全二叉树中添加节点9会得到下图d所示的二叉树并返回节点4。
> ● 函数get_root()返回完全二叉树的根节点。

![](./images/3.jpeg)

[题的力扣地址](https://leetcode-cn.com/problems/NaqhDT/)

可以用队列来存可以添加子节点的节点(左节点或右节点是空的)。添加节点时：
1. 将新节点添加在队列的第一个节点上。
2. 添加后，若该节已满(左右节点都有元素)。该节点出列，节点的左右节点入列。

查找可以添加子节点的节点要遍历树。存在多种遍历树节点的顺序。结合本题的情况，适合用广度优先来遍历树。
> 广度优先遍历指按顺序访问一层的每个节点，访问完后，再访问下一个层。

用队列很容易实现树的广度优先遍历。算法为：
1. 将树的根节点入列。
2. 出列。访问出列的节点。将节点的子节点入列。
3. 重复上一步，直到队列为空。

二叉树的数据结构如下：
```js
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
```

完整代码如下：
```js
const CBTInserter = function (root) {
  this.root = root;
  this.list = [root];
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

CBTInserter.prototype.get_root = function () {
  return this.root;
};

CBTInserter.prototype.enqueue = function (t) {
  this.list.push(t);
};

CBTInserter.prototype.dequeue = function () {
  return this.list.shift();
};
```

## 题4 - 剑指 Offer II 044. 二叉树每层的最大值
> 题目：输入一棵二叉树，请找出二叉树中每层的最大值。例如，输下图的二叉树，返回各层节点的最大值[3，4，9]。

![](./images/4.jpeg)

[题的力扣地址](https://leetcode-cn.com/problems/hPov7L/)

题目要求找树每层的最大值。树的广度优先遍历正好是按层的顺序来的。因此，只要在遍历每层节点的过程中，找出最大值即可。

可以用队列实现广度优先遍历树。要知道当前节点在哪一层，可以通过在节点入队时，传入层的信息。代码如下：

```js
const node = curr.node;
const level = curr.level;
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
```

完整代码如下：

```js
const largestValues = function (root) {
  if(!root) return [];
  const list = [
    {
      node: root,
      level: 1,
    },
  ];
  const maxValueArr = [];
  let curr;
  while (list.length > 0) {
    curr = list.shift();
    const node = curr.node;
    const level = curr.level;
    maxValueArr[level - 1] = Math.max(maxValueArr[level - 1] === undefined ? Number.NEGATIVE_INFINITY : maxValueArr[level - 1], node.val);
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
  return maxValueArr;
};
```

## 题5 - 剑指 Offer II 045. 二叉树最底层最左边的值
> 题目：如何在一棵二叉树中找出它最低层最左边节点的值？假设二叉树中最少有一个节点。

[题的力扣地址](https://leetcode-cn.com/problems/LwUNpT/)

本题和上题类似，用队列实现树的广度优先遍历。存每层最左边的节点值，最后取最后一层的。代码如下：

```js
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
```

## 题6 - 剑指 Offer II 046. 二叉树的右侧视图
> 题目：给定一棵二叉树，如果站在该二叉树的右侧，那么从上到下看到的节点构成二叉树的右侧视图。例如，下图中二叉树的右侧视图包含节点8、节点10和节点7。请写一个函数返回二叉树的右侧视图节点的值。

![](./images/6.jpeg)

[题的力扣地址](https://leetcode-cn.com/problems/WNC0Lk/)

本题和上题类似，用队列实现树的广度优先遍历。存每层最右边的节点。代码如下：

```js
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
```

## 总结
可以用队列实现树的广度优先遍历。在遍历时，获取第几层之类的信息，可以通过节点入队时传入。

当然，根据队列 “先入先出” 的特点，队列还会被用在接口的并发控制等场景。

## 相关阅读
* [《剑指Offer：专项突破版》 - 栈部分 JavaScript 题解](https://mp.weixin.qq.com/s/u7RDsgQzh19UkH02AotPfQ)
* [《剑指Offer：专项突破版》 - 哈希表部分 JavaScript 题解](https://mp.weixin.qq.com/s/o57JvPCih3YT2cOxvPTSvw)
* [《剑指Offer：专项突破版》 - 链表部分 JavaScript 题解](https://mp.weixin.qq.com/s/IOA1cOa38c4DHcANcQgSKA)
* [《剑指Offer：专项突破版》 - 数组部分 JavaScript 题解](https://mp.weixin.qq.com/s/gU9gDo60IWbuBmoeX4a3gA)
* [《剑指Offer：专项突破版》 - 字符串部分 JavaScript 题解](https://mp.weixin.qq.com/s/aD4sEREM50EF294Mnt7xrw)
* [《剑指Offer：专项突破版》 - 整数部分 JavaScript 题解](https://mp.weixin.qq.com/s/E9wxw1ahtBeCAE_njmIr2Q)