# 《剑指Offer：专项突破版》 - 链表部分 JavaScript 题解
《剑指Offer：专项突破版》是一个算法题集。该题单包含了程序员在准备面试过程中必备的数据结构与算法知识。具体包含：
- 数据结构：整数、数组、字符串、链表、哈希表、栈、队列、树、堆和前缀树。
- 算法：二分查找、排序、回溯法、动态规划和图搜索。 

本文来分享下链表部分题的解法~

## 链表介绍
> 链表是一种常见的基础数据结构。在链表中，每个节点包含指向下一个节点的指针，这些指针把节点连接成链状结构。

js 中没有链表这个数据结构。根据链表的定义，可以简单的实现一个：
```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}
```

链表的特点是：
* 插入或删除节点的时间复杂度低。增加或删除节点只需改插入或删除点前后两个节点的指针。
* 查询的时间复杂度高。找链表的第i个节点，只能从开始节点一个个往后找。

因此，链表的使用场景是：插入或删除频繁，查询不频繁。比如：编辑器的撤销功能。

## 题1 - 剑指 Offer II 021. 删除链表的倒数第 n 个结点
> 题目：如果给定一个链表，请问如何删除链表中的倒数第k个节点？假设链表中节点的总数为n，那么1≤k≤n。要求只能遍历链表一次。

[题的力扣地址](https://leetcode-cn.com/problems/SLwz0R/)

此题的难点在如何找到倒数第k+1个节点。找到了第k+1节点，删除第k个节点很容易：
```js
倒数第k+1个节点.next = 倒数第k+1个节点.next ? 倒数第k+1个节点.next.next : null
```

怎么找第k+1个节点？

倒着数第k+1个，就是正着数第 链表长度 - k 个。遍历链表，获取链表长度。重新遍历下，拿第 链表长度 - k 个节点，就是目标节点。

上面的算法要遍历链表两遍，不满足题目中的要求（只能遍历一遍）。用快慢指针的算法，只需遍历一遍。算法如下:
1. 快指针和慢指针开始都指向链表头部。
2. 快指针移动k步。
3. 然后快慢两个指针一同一步步往后移动。因此，两个指针间的距离始终为k。
4. 快指针到达链表末尾时，慢指针正好是倒数第k+1个节点。

代码如下：
```js
const removeNthFromEnd = function (head, n) {
  if (!head) {
    return head;
  }
  let len = 1;
  let slowIndex = head;
  let fastIndex = head;
  for (let i = 0; i < n; i++) {
    if (!fastIndex) {
      // 链表长度小于 n。
      return head;
    }
    fastIndex = fastIndex.next;
    if (fastIndex) {
      len++;
    }
  }
  if (len === n) {
    // 删除头节点。
    return head.next;
  }
  while (fastIndex && fastIndex.next) {
    fastIndex = fastIndex.next;
    slowIndex = slowIndex.next;
  }

  slowIndex.next = slowIndex.next ? slowIndex.next.next : null;
  return head;
};
```

## 题2 - 剑指 Offer II 022. 链表中环的入口节点
> 题目：如果一个链表中包含环，那么应该如何找出环的入口节点？从链表的头节点开始顺着next指针方向进入环的第1个节点为环的入口节点。

[题的力扣地址](https://leetcode-cn.com/problems/c32eOV/)

最容易想到的方法是：依次尝试每个节点是否是链表的入口。那有没有时间复杂度低一点的方法呢？

如果已知链表有环，并且知道环的长度。我们就可以通过快慢指针的方法找到环的入口：
1. 快指针和慢指针开始都指向链表头部。
2. 快指针移动 链表的长度 步。
3. 然后快慢两个指针一同一步步往后移动。
4. 当快指针追上慢指针时，慢指针指向的就是链表入口。

代码如下：
```js
slowIndex = head;
fastIndex = head;

for (let i = 0; i < circleLen; i++) {
  fastIndex = fastIndex.next;
}
while (slowIndex !== fastIndex) {
  slowIndex = slowIndex.next;
  fastIndex = fastIndex.next;
}
return slowIndex;
```

判断是否有环，可以用快慢指针的方式：
1. 快指针和慢指针开始都指向链表头部。
2. 快指针一次移动两步，慢指针一次移动一步。
3. 如果有环，快指针会追上慢指针。没有环，快指针会达到链表的尾部。

代码如下：
```js
while (fastIndex && fastIndex.next) {
  slowIndex = slowIndex.next;
  fastIndex = fastIndex.next.next;
  // 有环
  if (slowIndex === fastIndex) {
    break;
  }
}
// 没有环
if (!fastIndex || !fastIndex.next) {
  return null;
}
```

计算环的长度，依旧可以用快慢指针的算法。在上一步，快慢指针相遇后，快指针继续一次走两步，慢指针一次走一步，再次相遇快指针比慢指针多走了路程恰好是环的长度。代码如下：
```js
let circleLen = 0;
while (fastIndex && fastIndex.next) {
  slowIndex = slowIndex.next;
  fastIndex = fastIndex.next.next;
  circleLen++;
  if (slowIndex === fastIndex) {
    break;
  }
}
```

梳理一下，该算法的步骤如下：
1. 判断是否有环。
2. 若有环，计算环的长度。否则返回。
3. 通过环的长度和快慢指针的算法，找到环的入口。

## 题3 - 剑指 Offer II 023. 两个链表的第一个重合节点
> 输入两个单向链表，请问如何找出它们的第1个重合节点。

[题的力扣地址](https://leetcode-cn.com/problems/3u1WK4/)
从题中可知，重合的节点一定是在两个链表的末尾。因此，可以设计如下的算法：
1. 用两个数组存两条链表的所有节点。
2. 从后往前比较，直到找到不相同的节点。
3. 不相同节点的后一个节点，就是第一个重合节点。注意：一个链表有可能是另一个链表的一部分。此时，也就不存在不相同的节点，要特殊处理下。

代码如下：
```js
const getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return null;
  const { stack: stackA, length: lengthA } = toStack(headA);
  const { stack: stackB, length: lengthB } = toStack(headB);
  if (stackA[lengthA - 1] !== stackB[lengthB - 1]) {
    return null;
  }

  const minLength = Math.min(lengthA, lengthB);
  for (let i = 1; i <= minLength; i++) {
    if (stackA[lengthA - i] !== stackB[lengthB - i]) {
      const diff = stackA[lengthA - i];
      return diff.next;
    }
  }
  // 一个链表是另一个链表的一部分。
  return lengthA <= lengthB ? stackA[0] : stackB[0];
};

function toStack(head) {
  const stack = [];
  let length = 0;
  while (head) {
    stack.push(head);
    head = head.next;
    length++;
  }
  return {
    stack,
    length,
  };
}
```

还有一种巧妙的算法：
1. 将一条链的结尾指向另一条链的开头。
2. 新的链表中环的入口位置，就是两个链表的第一个重合节点。本题也就转化成了上题。

该算法很容易实现，就不贴代码了~

## 题4 - 剑指 Offer II 024. 反转链表
> 题目：定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

[题的力扣地址](https://leetcode-cn.com/problems/UHnkqh/)

本题比较容易，遍历链表的节点，把每个节点指向后面的节点，改成指向前面的节点即实现了反转链表。为了能让遍历进行下去，在改指针节点前，要先存下后面的节点。

代码如下：
```js
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
```

## 题5 - 剑指 Offer II 025. 链表中的两数相加
> 题目：给定两个表示非负整数的单向链表，请问如何实现这两个整数的相加并且把它们的和仍然用单向链表表示？链表中的每个节点表示整数十进制的一位，并且头节点对应整数的最高位数而尾节点对应整数的个位数。

[题的力扣地址](https://leetcode-cn.com/problems/lMSNwu/)

本题和之前做过的 [剑指 Offer II 002. 二进制加法](https://leetcode-cn.com/problems/JFETK5/) 类似。可以用类似的算法来求解：
1. 反转两个链表。
2. 将反转后的链表的每位依次相加。直到达到长的链的尾部。如果当前位已超过了短链的长度，则短链当前位的值为0。用长链来存求和的结果。
3. 如果长链的最高位进位了，则在链的尾部添加值为1的节点。
4. 反转长链。

代码如下：
```js
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
```

## 题6 - 剑指 Offer II 026. 重排链表
> 问题：给定一个链表，链表中节点的顺序是L0→L1→L2→…→Ln-1→Ln，请问如何重排链表使节点的顺序变成L0→Ln→L1→Ln-1→L2→Ln-2→…？

[题的力扣地址](https://leetcode-cn.com/problems/LGjMqU/)

通过观察发现，重排链表的规则是：
1. 将链表按长度平均分成两部分。如果链表长度是偶数，则两部分的长度相同。如果是奇数，则前半部分比后半部分的长度长1。
2. 反转后半部分。
3. 将反转后的后半部分的节点，一隔一的嵌入前部分的节点。即是重排后的链表。

我们来用个具体的例子来演示这个算法。给定的链表是 `[1, 2, 3, 4, 5, 6]`。
1. 平均分成两部分： `[1, 2, 3]` 和 `[4, 5, 6]`。
2. 反转后半部分。后半部分变为： `[6, 5, 4]`。
3. 反转后的后半部分的节点，一隔一的嵌入前部分的节点。变为：`[1, 6, 2, 5, 3, 4]`。

将链表按长度平均分成两部分，可以用快慢指针来实现。快指针一次走两步，慢指针一次走一步。快指针走到链表末尾时，慢指针指向的就是中间节点。

完整的实现代码如下：
```js
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

// 链表长度至少为3。
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
```

## 题7 - 剑指 Offer II 027. 回文链表
> 问题：如何判断一个链表是不是回文？要求解法的时间复杂度是O（n），并且不得使用超过O（1）的辅助空间。如果一个链表是回文，那么链表的节点序列从前往后看和从后往前看是相同的。

[题的力扣地址](https://leetcode-cn.com/problems/aMhZSa/)

回文链表的特点是：将链表一分为二，后半部分反转后和前半部分的节点的值都相同。因此，不难设计出如下的算法：
1. 将链表一分二。如果链表长度是奇数个，去掉中间节点。
2. 反转后半部分链表，然后比较前后两部分是否相等。

核心代码如下：
```js
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
```

## 题8 - 剑指 Offer II 028. 展平多级双向链表
> 问题：在一个多级双向链表中，节点除了有两个指针分别指向前后两个节点，还有一个指针指向它的子链表，并且子链表也是一个双向链表，它的节点也有指向子链表的指针。请将这样的多级双向链表展平成普通的双向链表，即所有节点都没有子链表。

[题的力扣地址](https://leetcode-cn.com/problems/Qv1Da2/)

这题看起来很难，其实用递归的方式来做很容易。算法如下：
1. 遍历链表，遇到有子链表的，把该节点的下一个节点丢入栈中。
2. 递归调用，将 子链表展平 后的节点，设置为父节点的下一个节点。
3. 遍历完链表，取出栈中的节点。递归调用，将 节点展平 后的节点，添加到链表的末尾。
4. 重复上一步，值到栈为空。程序结束。

代码如下：
```js
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
```

## 题9 - 剑指 Offer II 029. 排序的循环链表
> 问题：在一个循环链表中节点的值递增排序，请设计一个算法在该循环链表中插入节点，并保证插入节点之后的循环链表仍然是排序的。

[题的力扣地址](https://leetcode-cn.com/problems/4ueAj6/)

算法如下：
1. 遍历一圈，找到环中值最大的节点，最大值和最小值。
2. 如果插入值大于等于最大值或小于等于最小值。则该节点插入到最大值和最小值节点中间。
3. 插入值处于最大值，最小值中间时，从最小节点开始遍历，找到要插入的节点。

该题包含的情况挺多的，要注意下。比如：
* 循环列表没有节点。
* 循环列表只有一个节点。
* 循环列表只有两个节点。
* 循环列表的第一个节点不是最小值: [3, 4, 1]
* 循环列表的第一个节点是最小值: [1, 3, 4]
* 插入的值比最大值大或比最小值小。

完整代码如下：
```js
const insert = function (head, insertVal) {
  const insertNode = new Node(insertVal);
  // 没有节点的情况
  if (!head) {
    insertNode.next = insertNode;
    return insertNode;
  }
  // 一个节点的情况
  if (head.next === head) {
    insertNode.next = head;
    head.next = insertNode;
    return head;
  }
  // 两个节点的情况
  if (head.next.next === head) {
    if (insertVal > head.next.val || insertVal < head.val) {
      insertNode.next = head;
      head.next.next = insertNode;
    } else {
      let temp = head.next;
      head.next = insertNode;
      insertNode.next = temp;
    }

    return head;
  }

  let max = Number.MIN_VALUE;
  let min = Number.MAX_VALUE;
  const firstNode = head;
  let beforeNode = firstNode;
  let currNode = beforeNode.next;
  let nextNode = currNode.next;
  let maxNode;
  let beforeMaxNode;
  // 找最大值和最小值
  while (currNode.next !== firstNode.next) {
    const currMax = Math.max(currNode.val, nextNode.val);
    const currMin = Math.min(currNode.val, nextNode.val);
    // 可能会存在多个最大值相同的情况。不加等号会出问题。
    if (currMax >= max) {
      max = currMax;
      beforeMaxNode = currNode.val >= nextNode.val ? beforeNode : currNode;
      maxNode = beforeMaxNode.next;
    }
    if (currMin < min) {
      min = currMin;
    }
    beforeNode = beforeNode.next;
    currNode = currNode.next;
    nextNode = nextNode.next;
  }

  // 插入值大于等于最大值或小于等于最小值。则该节点插入到最大值和最小值节点中间。
  const isTooBigOrSmall = insertVal >= max || insertVal <= min;
  if (isTooBigOrSmall) {
    const beforeInsertNode = maxNode;
    insertNode.next = beforeInsertNode.next;
    beforeInsertNode.next = insertNode;
    return head;
  }

  // 从最小节点转一圈，一定找得到插入的点
  currNode = maxNode.next;
  nextNode = currNode.next;
  while (currNode.next !== maxNode.next) {
    if (currNode.val <= insertVal && nextNode.val >= insertVal) {
      currNode.next = insertNode;
      insertNode.next = nextNode;
      return head;
    }
    currNode = currNode.next;
    nextNode = nextNode.next;
  }
};
```
## 总结
链表中经常会用到快慢指针的算法。可以用快慢指针的算法：
* 来探测链表中是否有环。
* 计算环的长度。
* 将链表一分为二。当然，也支持将链表任意等分。只需改快指针的速度即可。

## 相关阅读
* [《剑指Offer：专项突破版》 - 数组部分 JavaScript 题解](https://mp.weixin.qq.com/s/gU9gDo60IWbuBmoeX4a3gA)
* [《剑指Offer：专项突破版》 - 字符串部分 JavaScript 题解](https://mp.weixin.qq.com/s/aD4sEREM50EF294Mnt7xrw)
* [《剑指Offer：专项突破版》 - 整数部分 JavaScript 题解](https://mp.weixin.qq.com/s/E9wxw1ahtBeCAE_njmIr2Q)