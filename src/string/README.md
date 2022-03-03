# 《剑指Offer：专项突破版》 - 字符串部分 JavaScript 题解
《剑指Offer：专项突破版》是一个算法题集。该题单包含了程序员在准备面试过程中必备的数据结构与算法知识。 具体包含：
- 数据结构：整数、数组、字符串、链表、哈希表、栈、队列、树、堆和前缀树。
- 算法：二分查找、排序、回溯法、动态规划和图搜索。 

本文来分享下字符串的解法~

## 题1 - 剑指 Offer II 014. 字符串中的变位词
> 输入字符串s1和s2，如何判断字符串s2中是否包含字符串s1的某个变位词？如果字符串s2中包含字符串s1的某个变位词，则字符串s1至少有一个变位词是字符串s2的子字符串。假设两个字符串中只包含英文小写字母。例如，字符串s1为"ac"，字符串s2为"dgcaf"，由于字符串s2中包含字符串s1的变位词"ca"，因此输出为true。如果字符串s1为"ab"，字符串s2为"dgcaf"，则输出为false。

[题的力扣地址](https://leetcode-cn.com/problems/MPnaiL/)

最容易想到的方案是：找出 s1 的所有变位词，然后一个个去 s2 中找。但这种方法的效率比较低。

通过分析，我们可以发现变位词的两个特点：
1. 两个变位词的各个字母出现的次数相同。
2. 两个变位词的长度相同。

通过这两个特点我们设计如下高效的算法：
1. 遍历 s2 中所有长度和 s1 长度一样的子字符串。可以用双指针法，开始下标为 `0`，结束下标始终为 `开始下标 + s1长度 - 1`。向右移动开始下标，直到结束下标为 s2 的末尾。此时，则遍历了所有满足条件的子字符串。
2. 遍历时，比较当前子字符串是否是 s1 的变位词，如果是，返回true。遍历结束，仍未找到，返回 false。
3. 比较对位词的方法是： 统计两个字符串中，各字母的数量。如果各字母的数量完全相同，则是对位词。

要进一步减少算法的时间复杂度，可以用一个对象保存 s1 与当前字符串的各字母出现数的差值。下标移动一位，新的子字符串只是头部少了第一个字母，尾部多了一个新的字母。保存字母数量的对象，也只需做对应的修改即可。

下面，我们通过个例子来看下该算法的运行过程。假设 s1 是 `ab`， s2 是 `adebae`。s1 的字母出现的次数对象： `{a: 1, b: 1}`。
|  步骤   | 开始下标 | 结束下标 | 子字符串 | 字母出现次数差值 |
|  ----  | ----  | ----  | ----  | ----  |
|  第1步 | 0 | 1 | ad | {a: 0, b: 1, d: -1} |
|  第2步 | 1 | 2 | de | {a: 1: b: 1, d: -1, e: -1} |
|  第3步 | 2 | 3 | eb | {a: 1: b: 0, e: -1}  |
|  第4步 | 3 | 4 | ba | {a: 0, b: 0} |

经过 4 步，在 s2 中找到了 s1 的对位词： `ba`。

核心代码如下：
```js
const checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) {
    return false;
  }
  const count = {};
  for (let i = 0; i < s1.length; i++) {
    count[s1[i]] = (count[s1[i]] || 0) + 1;
    count[s2[i]] = (count[s2[i]] || 0) - 1;
  }

  if (isAllZero(count)) {
    return true;
  }

  let start = 0;
  let end = start + s1.length;
  for (; end < s2.length; start++, end++) {
    count[s2[start]] = (count[s2[start]] || 0) + 1; // 出
    count[s2[end]] = (count[s2[end]] || 0) - 1; // 入
    if (isAllZero(count)) {
      return true;
    }
  }
  return false;
};

function isAllZero(count) {
  return Object.values(count).every((c) => c === 0);
}
```


## 题2 - 剑指 Offer II 015. 字符串中的所有变位词
> 输入字符串s1和s2，如何找出字符串s2的所有变位词在字符串s1中的起始下标？假设两个字符串中只包含英文小写字母。例如，字符串s1为"cbadabacg"，字符串s2为"abc"，字符串s2的两个变位词"cba"和"bac"是字符串s1中的子字符串，输出它们在字符串s1中的起始下标0和5。

[题的力扣地址](https://leetcode-cn.com/problems/VabMRr/)

本题和上一题大同小异，可以用上题的算法来实现。这边就不做赘述了。

核心代码如下：
```js
const findAnagrams = function (s2, s1) {
  const res = [];
  if (s1.length > s2.length) {
    return [];
  }
  const count = {};
  for (let i = 0; i < s1.length; i++) {
    count[s1[i]] = (count[s1[i]] || 0) + 1;
    count[s2[i]] = (count[s2[i]] || 0) - 1;
  }

  if (isAllZero(count)) {
    res.push(0);
  }

  let start = 1;
  let end = start + s1.length - 1;
  for (; end < s2.length; start++, end++) {
    count[s2[start - 1]] = (count[s2[start - 1]] || 0) + 1; // 出
    count[s2[end]] = (count[s2[end]] || 0) - 1; // 入
    if (isAllZero(count)) {
      res.push(start);
    }
  }
  return res;
};
```

## 题3 - 剑指 Offer II 016. 不含重复字符的最长子字符串
> 输入一个字符串，求该字符串中不含重复字符的最长子字符串的长度。例如，输入字符串"babcca"，其最长的不含重复字符的子字符串是"abc"，长度为3。

[题的力扣地址](https://leetcode-cn.com/problems/wtcaE1/)

可以用双指针的方法来高效的查找。具体算法如下：
1. 用开始下标和结束下标来遍历字符串。开始下标和结束下标构成一个子字符串。开始下标和结束下标初始均为0。
2. 用一个对象来存当前子字符串中各字母出现的次数。如果某个字符出现的次数大于1，则含重复字符。如 `{a: 1, b: 1, c: 2}`。
3. 如果当前子字符串含重复的字符。则右移开始下标(子字符串长度变小），直到子字符串不含重复字符或开始下标为结束下标。移动结束后，如果当前子字符串不含重复的字符，则比较当前字符串长度和之前记录的长度，记录新的最长的长度。
4. 右移结束下标。重复上一步，直到结束下标到字符串末尾。

代码实现如下：
```js
const lengthOfLongestSubstring = function (s) {
  if (s.length === 0) {
    return 0;
  }
  let max = 0;
  let start = 0;
  let end = 0;
  const count = {};

  for (; end < s.length; end++) {
    count[s[end]] = (count[s[end]] || 0) + 1;
    while (isRepeat(count) && start < end) {
      count[s[start]] = (count[s[start]] || 0) - 1;
      start++;
    }
    if (!isRepeat(count)) {
      max = Math.max(max, end - start + 1);
    }
  }
  return max;
};

function isRepeat(count) {
  return Object.values(count).findIndex((c) => c > 1) !== -1;
}
```

## 题4 - 剑指 Offer II 017. 含有所有字符的最短字符串
> 输入两个字符串s和t，请找出字符串s中包含字符串t的所有字符的最短子字符串。例如，输入的字符串s为"ADDBANCAD"，字符串t为"ABC"，则字符串s中包含字符'A'、'B'和'C'的最短子字符串是"BANC"。如果不存在符合条件的子字符串，则返回空字符串""。如果存在多个符合条件的子字符串，则返回任意一个。

[题的力扣地址](https://leetcode-cn.com/problems/M1oyTv/)

本题和上题大同小异，也可以用双指针法：
1. 未找到含有所有字符的最短字符串时，右移结束下标。
2. 找到含有所有字符的最短字符串后，右移开始下标，来减少目标字符串的长度。

代码实现如下：
```js
const minWindow = function (s, t) {
  if (s.length === 0 || t.length === 0) {
    return '';
  }

  const uniqT = uniq(t);
  const count = {};
  let min = Number.MAX_VALUE;
  let res = '';

  let start = 0;
  let end = 0;

  for (let i = 0; i < t.length; i++) {
    count[t[i]] = (count[t[i]] || 0) + 1;
  }

  for (; end < s.length; ) {
    count[s[end]] = (count[s[end]] || 0) - 1;

    while (isInclude(count, uniqT) && start <= end) {
      let currLen = end - start + 1;
      if (currLen < min) {
        min = currLen;
        res = s.slice(start, end + 1);
      }
      if (start < end) {
        count[s[start]] = (count[s[start]] || 0) + 1;
        start++;
      } else {
        break;
      }
    }

    end++;
  }
  return res;
};

function isInclude(count, str) {
  let flag = true;
  str.split('').forEach((s) => {
    if (count[s] > 0) {
      flag = false;
    }
  });
  return flag;
}

function uniq(str) {
  const res = [];
  const cache = {};
  str.split('').forEach((s) => {
    if (!cache[s]) {
      res.push(s);
      cache[s] = true;
    }
  });
  return res.join('');
}
```

## 题5 - 剑指 Offer II 018. 有效的回文
> 给定一个字符串，请判断它是不是回文。假设只需要考虑字母和数字字符，并忽略大小写。例如，"Was it a cat I saw？"是一个回文字符串，而"race a car"不是回文字符串。

[题的力扣地址](https://leetcode-cn.com/problems/XltzEq/)

回文字符串的特点是：字符串两端的字符是对称的。因此，判读是否是回文字符串，只要从第一个字符遍历到中间位置的字符，检查其对称的字符是否均相同。代码实现如下：
```js
const isPalindrome = function (formatedStr) {
  const len = formatedStr.length;
  const isEvenLen = len % 2 === 0;
  const middleEndIndex = isEvenLen ? len / 2 - 1 : Math.floor(len / 2);

  for (let i = 0; i <= middleEndIndex; i++) {
    if (formatedStr[i] !== formatedStr[len - i - 1]) {
      return false;
    }
  }
  return true;
};
```

当然，也可以从中间位置往两端遍历。


需要注意的是，给的字符串中有除了字母和数字字符外的其他字符。因此，判断回文时，要先过滤掉其他字符，并忽略字母的大小写。代码如下：

```js
const letterNumberStr = s
    .split('')
    .filter((c) => /[0-9a-zA-Z]/.test(c))
    .join('');
const formatedStr = letterNumberStr.toLowerCase();
```

## 题6 - 剑指 Offer II 019. 最多删除一个字符得到回文
> 给定一个字符串，请判断如果最多从字符串中删除一个字符能不能得到一个回文字符串。例如，如果输入字符串"abca"，由于删除字符'b'或'c'就能得到一个回文字符串，因此输出为true。

[题的力扣地址](https://leetcode-cn.com/problems/RQku0D/)

题中的 "最多从字符串中删除一个字符" 包含两种情况：
1. 删除0个字符。即，已经是回文。
2. 删除1个字符。

用上题的算法，判断是否已经是回文。
1. 如果是，返回 true。
2. 否则，尝试删除字符串中不满足回文条件的那个字符或对称的字符。再判断一遍是否是回文。


代码实现如下：
```js
const validPalindrome = function (s) {
  const len = s.length;
  const isEvenLen = len % 2 === 0;
  const middleEndIndex = isEvenLen ? len / 2 - 1 : Math.floor(len / 2);

  let isAlreadyPalindrome = true;
  let i = 0;
  for (; i <= middleEndIndex; i++) {
    if (s[i] !== s[len - i - 1]) {
      isAlreadyPalindrome = false;
      break;
    }
  }

  if (isAlreadyPalindrome) {
    return true;
  }

  const res =
    isPalindrome(removeChar(s, i)) ||
    isPalindrome(removeChar(s, len - i - 1, 1));

  return res;
};

function removeChar(s, removeIndex) {
  const left = s.slice(0, removeIndex);
  const right = s.slice(removeIndex + 1);
  return left + right;
}
```

## 题7 - 剑指 Offer II 020. 回文子字符串的个数
> 给定一个字符串，请问该字符串中有多少个回文连续子字符串？例如，字符串"abc"有3个回文子字符串，分别为"a"、"b"和"c"；而字符串"aaa"有6个回文子字符串，分别为"a"、"a"、"a"、"aa"、"aa"和"aaa"。

[题的力扣地址](https://leetcode-cn.com/problems/a7VOhD/)

判断是否是回文，可以从两端向中心来判断。当然，也可以从中心往两端判断。

本题适合用中心点往两边的方法来判断。找某个中心点，看是否是回文字符串。如果是，往两边扩展一个字符，判断是否是回文。重复这个过程，直到一边到达字符串的边界。

在查找的过程中，如果字符串的长度是奇数，则中心点是一个。注意不要遗漏字符串的长度是偶数的情况。如果是偶数，中心点是两个。

核心代码实现如下：
```js
const countSubstrings = function (s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    count += findPalindromeByCenter(s, i, i);
    count += findPalindromeByCenter(s, i, i + 1);
  }
  return count;
};

// 偶数是 c2 = c1 + 1; 奇数时 c1 = c2
function findPalindromeByCenter(s, c1, c2) {
  let count = 0;
  while (c1 >= 0 && c2 < s.length) {
    if (isPalindrome(s.slice(c1, c2 + 1))) {
      count += 1;
    }
    c1--;
    c2++;
  }
  return count;
}

```

## 总结
在字符串中查找满足条件的子符串时，巧用双指针法，可以减少遍历字符串的次数。难点在确定开始，结束指针的位置，移动规则，做到不遗漏情况。

## 推荐阅读
* [《剑指Offer：专项突破版》 - 整数部分 JavaScript 题解](https://mp.weixin.qq.com/s/E9wxw1ahtBeCAE_njmIr2Q)
* [《剑指Offer：专项突破版》 - 数组部分 JavaScript 题解](https://mp.weixin.qq.com/s/gU9gDo60IWbuBmoeX4a3gA)