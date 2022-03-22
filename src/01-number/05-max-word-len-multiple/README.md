# [单词长度的最大乘积](https://leetcode-cn.com/problems/aseY1I/)
## 题
给定一个字符串数组 words，请计算当两个字符串 words[i] 和 words[j] 不包含相同字符时，它们长度的乘积的最大值。假设字符串中只包含英语的小写字母。如果没有不包含相同字符的一对字符串，返回 0。

## 解决方案
### 算法
1. 用一位是1其他位数是0的二进制来表示一个不同的字母。比如 a 是 1, b 是 10, c 是 100。
2. 去掉单词内相同的字母。
3. 将单词包含的字母表示的二进制数求和。
4. 单词之间做 & 操作，结果为0，则表示没有相同的字母。
 
JavaScript 的实现如下：
```js
const maxProduct = function (words) {
  const lettersArr = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const lettersValue = {};
  for (let i = 0; i < 26; i++) {
    lettersValue[lettersArr[i]] = 1 << i;
  }

  // 单词内的字母去重
  const uniqCharWords = words.map((word) => uniq(word));
  const wordsSum = uniqCharWords.map((word) => {
    return getSum(word, lettersValue);
  });

  let max = 0;
  for (i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if ((wordsSum[i] & wordsSum[j]) === 0) {
        // 两个单词没有相同的字符
        const value = words[i].length * words[j].length;
        if (value > max) {
          max = value;
        }
      }
    }
  }
  return max;
};

function uniq(word) {
  const res = [];
  const cache = {};
  word.split('').forEach((c) => {
    if (cache[c]) {
      return;
    }
    cache[c] = true;
    res.push(c);
  });
  return res.join('');
}

function getSum(word, lettersValue) {
  return word.split('').reduce((prev, curr) => prev + lettersValue[curr], 0);
}
```

