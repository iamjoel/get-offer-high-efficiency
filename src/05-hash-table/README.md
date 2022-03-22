# 《剑指Offer：专项突破版》 - 哈希表部分 JavaScript 题解
《剑指Offer：专项突破版》是一个算法题集。该题单包含了程序员在准备面试过程中必备的数据结构与算法知识。具体包含：
- 数据结构：整数、数组、字符串、链表、哈希表、栈、队列、树、堆和前缀树。
- 算法：二分查找、排序、回溯法、动态规划和图搜索。 

本文来分享下哈希表部分题的解法~

## 哈希表介绍
> 哈希表（Hash table，也叫散列表），是根据关键码值(Key value)而直接进行访问的数据结构。

哈希表的优势是高效。哈希表的插入、删除和查找的时间复杂度都是：O（1）。因此，哈希表经常被用来优化时间效率。

在 js 中，对象就是哈希表。

## 题1 - 剑指 Offer II 030. 插入、删除和随机访问都是 O(1) 的容器
> 题目：设计一个数据结构，使如下3个操作的时间复杂度都是O（1）。
> ● insert（value）：如果数据集中不包含一个数值，则把它添加到数据集中。
> ● remove（value）：如果数据集中包含一个数值，则把它删除。
> ● getRandom()：随机返回数据集中的一个数值，要求数据集中每个数字被返回的概率都相同。

[题的力扣地址](https://leetcode-cn.com/problems/FortPu/)

js中，对象的插入、删除和随机访问的时间复杂度都是 O(1) 。因此，容器内部用一个来对象来处理插入、删除和随机访问即可。代码如下：

```js
const RandomizedSet = function() {
  this.data = {}
  this.len = 0
};

RandomizedSet.prototype.insert = function(val) {
  if(!this.data[val]) {
    this.data[val] = true
    this.len++
    return true
  }
  return false
};

RandomizedSet.prototype.remove = function(val) {
  if(this.data[val]) {
    delete this.data[val]
    this.len--
    return true
  }
  return false
};

RandomizedSet.prototype.getRandom = function() {
  const randomIndex = Math.floor(Math.random() * this.len)
  return Object.keys(this.data)[randomIndex]
};
```


## 题2 - 剑指 Offer II 031. 最近最少使用缓存
> 题目：请设计实现一个最近最少使用（Least Recently Used，LRU）缓存，要求如下两个操作的时间复杂度都是O（1）。
> ● get（key）：如果缓存中存在键key，则返回它对应的值；否则返回-1。
> ● put（key，value）：如果缓存中之前包含键key，则它的值设为value；否则添加键key及对应的值value。在添加一个键时，如果缓存容量已经满了，则在添加新键之前删除最近最少使用的键（缓存中最长时间没有被使用过的元素）。

[题的力扣地址](https://leetcode-cn.com/problems/OrIXps/)

容易想到的是：用对象来存数据，用另一个对象来存键的访问次数。但这么做，在缓存容量已满，要删除最近最少使用的键时，需要遍历存键值数量的对象，找的最小值。该操作的时间复杂度是O(n)，超过了要求：O(1)。

双向链表插入和删除节点的时间复杂度是O（1），对象的查询复杂度是 O（1）。因此，结合这两种数据结构的特点，可以设计出满足时间复杂度的算法。具体步骤如下：
1. 用一个双向链表来存数据，用一个对象来存每个key在双向链表中位置。
2. 执行get操作时。如果该 key 对应的节点存在，将该key对应的链表节点移动到链表的尾部。因此，长时间没用的链表节点，会在链表头部。
3. 执行put操作时，如果缓存容量已经满了。删除链表头部的节点。
4. 执行put操作时，如果 key 不存在，则创建链表节点，丢到链表最后。否则，改对应链表节点的值。

如下图所示：
![](./images/hasmap-link-node.png)

双向链表的定义：
```js
class ListNode {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}
```

将节点插入到链表尾部：
```js
function insertToTail(node, tail) {
  const prevNode = tail.prev;
  node.prev = prevNode;
  node.next = tail;
  prevNode.next = node;
  tail.prev = node;
}
```

移除链表的头部节点：
```js
function removeFromHead(head) {
  let removeKey = head.next.key;
  head.next = head.next.next;
  head.next.prev = head;
  return removeKey;
}
```

将当前节点移动到链表尾部。代码如下：
```js
function moveToTail(node, tail) {
  // 移除
  node.prev.next = node.next;
  node.next.prev = node.prev;
  // 插入
  insertToTail(node, tail);
}
```

主体逻辑的代码如下：
```js
const LRUCache = function (capacity) {
  this.capacity = capacity;
  this.len = 0;
  // head, tail 是哨岗节点，方便插入和删除，不需要判断是否为空。
  this.head = new ListNode(-1, -1);
  this.tail = new ListNode(-1, -1);
  this.head.next = this.tail;
  this.tail.prev = this.head;
  this.hashmap = {}; // 存储节点在链表中的位置。
};

LRUCache.prototype.get = function (key) {
  const node = this.hashmap[key];
  if (!node) {
    return -1;
  }
  moveToTail(node, this.tail);
  return node.val;
};

LRUCache.prototype.put = function (key, value) {
  let node = this.hashmap[key];
  // 新增
  if (!node) {
    if (this.capacity === this.len) {
      const removeKey = removeFromHead(this.head);
      delete this.hashmap[removeKey];
      this.len--;
    }
    node = new ListNode(key, value);
    insertToTail(node, this.tail);
    this.hashmap[key] = node;
    this.len++;
  } else {
    // 更新
    node.val = value;
    moveToTail(node, this.tail);
  }
};
```

## 题3 - 剑指 Offer II 032. 有效的变位词
> 题目：给定两个字符串s和t，请判断它们是不是一组变位词。在一组变位词中，它们中的字符及每个字符出现的次数都相同，但字符的顺序不能相同。例如，"anagram"和"nagaram"就是一组变位词。

[题的力扣地址](https://leetcode-cn.com/problems/dKk3P7/)

变位词的特点是：单词中每个字符出现的次数都相同。因此可以用对象来存单词中各个字母出现的次数。比较该对象的内容是否相同，即可判断两个单词是否是变位词。代码如下：
```js
const isAnagram = function (s, t) {
  if (s === t || s.length !== t.length) {
    return false;
  }

  const sAlphaCount = getAlphaCount(s);
  const tAlphaCount = getAlphaCount(t);
  return Object.keys(sAlphaCount).every(
    (c) => sAlphaCount[c] === tAlphaCount[c]
  );
};

function getAlphaCount(s) {
  const alphaCount = {};
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (!alphaCount[char]) {
      alphaCount[char] = 1;
    } else {
      alphaCount[char]++;
    }
  }
  return alphaCount;
}
```

还有一种算法：将单词中的字母按照字母的 ascii 码排序。变位词排序后的字符串是相同的。单词排序算法如下：
```js
function sortWord(word) {
  const arr = word.split('');
  arr.sort((a, b) => a.charCodeAt() - b.charCodeAt());
  return arr.join('');
}
```

还有一种算法。质数不能分解成除自身和1之外的其他整数。利用这个特性，用不同的质数来表示不同的字母。将单词中所有字母对应的质数相乘。变位词的乘积相同。需要注意的是，如果单词很长的话，乘积会有溢出的风险。

## 题4 - 剑指 Offer II 033. 变位词组
> 题目：给定一组单词，请将它们按照变位词分组。例如，输入一组单词["eat"，"tea"，"tan"，"ate"，"nat"，"bat"]，这组单词可以分成3组，分别是["eat"，"tea"，"ate"]、["tan"，"nat"]和["bat"]。假设单词中只包含英文小写字母。

[题的力扣地址](https://leetcode-cn.com/problems/sfvd7V/)

可以用上题中的算法，来判断是否两个词是否是变位词。然后将变位词做个分组即可。代码如下：
```js
const groupAnagrams = function (strs) {
  const group = {};
  const sortedStr = strs.map((str) => sortWord(str));
  sortedStr.forEach((str, i) => {
    if (!group[str]) {
      group[str] = [strs[i]];
    } else {
      group[str].push(strs[i]);
    }
  });
  const res = Object.values(group);
  return res;
};

function sortWord(word) {
  const arr = word.split('');
  arr.sort((a, b) => a.charCodeAt() - b.charCodeAt());
  return arr.join('');
}
```


## 题5 - 剑指 Offer II 034. 外星语言是否排序
> 题目：有一门外星语言，它的字母表刚好包含所有的英文小写字母，只是字母表的顺序不同。给定一组单词和字母表顺序，请判断这些单词是否按照字母表的顺序排序。例如，输入一组单词["offer"，"is"，"coming"]，以及字母表顺序"zyxwvutsrqponmlkjihgfedcba"，由于字母'o'在字母表中位于'i'的前面，因此单词"offer"排在"is"的前面；同样，由于字母'i'在字母表中位于'c'的前面，因此单词"is"排在"coming"的前面。因此，这一组单词是按照字母表顺序排序的，应该输出true。

[题的力扣地址](https://leetcode-cn.com/problems/lwyVBB/)

排序需要比较大小，但字母没法比较大小。将字母转化成数字后就可以比较大小了。具体算法如下：
1. 用不同的数字来表示字母，根据字母表的顺序，顺序越靠后，数字越大。
2. 用对象来存所有字母对应的数字值。
3. 比较两个单词是否是排序，只需从头开始依次比较字母的数字值即可。
4. 从头开始，比较所有相邻的两个单词，如果都是排序的，则结果是排序的。

代码如下：
```js
const isAlienSorted = function (words, order) {
  const orderMap = getOrderMap(order);
  let i = 0;
  while (i < words.length - 1) {
    if (!compare(words[i], words[i + 1], orderMap)) {
      return false;
    }
    i++;
  }
  return true;
};

function getOrderMap(order) {
  const orderMap = {};
  order.split('').forEach((c, index) => {
    orderMap[c] = index + 1;
  });
  return orderMap;
}

function compare(w1, w2, orderMap) {
  let i = 0;
  while (i < w1.length && i < w2.length) {
    if (orderMap[w1[i]] > orderMap[w2[i]]) {
      return false;
    }
    if (orderMap[w1[i]] < orderMap[w2[i]]) {
      return true;
    }
    i++;
  }
  // 前面都相同，但 w1 更长。
  if(w1.length > w2.length) {
    return false;
  }
  return true;
}
```

## 题6 - 剑指 Offer II 035. 最小时间差
> 题目：给定一组范围在00：00至23：59的时间，求任意两个时间之间的最小时间差。例如，输入时间数组["23：50"，"23：59"，"00：00"]，"23：59"和"00：00"之间只有1分钟的间隔，是最小的时间差。

[题的力扣地址](https://leetcode-cn.com/problems/569nqc/)

将时间转化成分钟，然后从小到大排序后，比较相邻两个数字的差值，取最小值即可。注意：不要漏 `比较最小值 + 24小时` 和 最大值做比较，比如： `["00: 00", "23：49", "23：59"]` 的最小时间差不是 10 分钟(`23：59 - 23：49`)，而是 1 分钟(`00: 00 + 24:00 - 23：59`)。

代码如下：
```js
const ONE_DAY_MINUTE = 24 * 60
const findMinDifference = function(timePoints) {
  if(timePoints.length <= 1) {
    return 0;
  }
  const minutes = timePoints.map(time => toMinute(time));
  minutes.sort((a, b) => a - b);
  const diff = minutes.map((m, i) => {
    if(i === 0) { // 最后一个和第一个的差值。
      return m + ONE_DAY_MINUTE - minutes[minutes.length - 1];
    }
    return m - minutes[i - 1];
  })
  const min = Math.min(...diff);
  return min;
};

function toMinute(time) {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}
```

## 相关阅读
* [《剑指Offer：专项突破版》 - 链表部分 JavaScript 题解](https://mp.weixin.qq.com/s/IOA1cOa38c4DHcANcQgSKA)
* [《剑指Offer：专项突破版》 - 数组部分 JavaScript 题解](https://mp.weixin.qq.com/s/gU9gDo60IWbuBmoeX4a3gA)
* [《剑指Offer：专项突破版》 - 字符串部分 JavaScript 题解](https://mp.weixin.qq.com/s/aD4sEREM50EF294Mnt7xrw)
* [《剑指Offer：专项突破版》 - 整数部分 JavaScript 题解](https://mp.weixin.qq.com/s/E9wxw1ahtBeCAE_njmIr2Q)