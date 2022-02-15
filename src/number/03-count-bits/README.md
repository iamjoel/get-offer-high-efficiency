# [003 前 n 个数字二进制中 1 的个数](https://leetcode-cn.com/problems/w3tCBm/)
## 题
给定一个非负整数 n ，请计算 0 到 n 之间的每个数字的二进制表示中 1 的个数，并输出一个数组。

## 解决方案
### 算法1 暴力解法
遍历所有数字，一个个算。

JavaScript 的实现如下：
```js
const countBits = function (n) {
  const numArr = [];
  for (let i = 0; i <= n; i++) {
    numArr.push(countBit(i));
  }
  return numArr;
};

function countBit(num) {
  const binaryArr = num
    .toString(2)
    .split('')
    .map((item) => parseInt(item, 10));
  return binaryArr.filter((item) => item === 1).length;
}
```

该算法存在的问题是：时间复杂度高。

### 算法2: 根据奇数偶数的特点
如果正整数i是一个偶数，那么i相当于将“i/2”左移一位的结果，因此偶数i和“i/2”的二进制形式中1的个数是相同的。如果i是奇数，那么i相当于将“i/2”左移一位之后再将最右边一位设为1的结果，因此奇数i的二进制形式中1的个数比“i/2”的1的个数多1。JavaScript 的实现如下：
```js
const countBits = function (n) {
  if (n === 0) {
    return [0];
  }
  if (n === 1) {
    return [0, 1];
  }
  const res = [0, 1];
  for (let i = 2; i <= n; i++) {
    if (i % 2 === 0) {
      res[i] = res[i / 2];
    } else {
      res[i] = res[(i - 1) / 2] + 1;
    }
  }
  return res;
};
```

