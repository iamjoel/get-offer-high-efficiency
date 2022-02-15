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

### 算法2: 
JavaScript 的实现如下：
```js
```

该算法存在的问题是：。

完整代码：

