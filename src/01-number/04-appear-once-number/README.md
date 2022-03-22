# [只出现一次的数字](https://leetcode-cn.com/problems/WGki4K/)
## 题
给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。

## 解决方案
### 算法1: 计算所有数字出现的次数
计算数组中所有数字出现的次数。筛选出只出现一次的。JavaScript 的实现如下：
```js
const singleNumber = function (nums) {
  const count = {};
  nums.forEach((item) => {
    if (!count[item]) {
      count[item] = 1;
    } else {
      count[item] = count[item] + 1;
    }
  });
  let res;
  Object.keys(count).forEach((key) => {
    const value = count[key];
    if (value === 1) {
      res = key;
    }
  });
  return res;
};
```

### 算法2: 用二进制的方法
1. 将数组中所有数字转化成二进制。
2. 每位求和，除以3。
3. 结果就是只出现一次的数字的二进制。

要注意的是，可能会存在负数。我这边是把负数全部转化成正数。最后找到的正数去原数组里找，如果是存在一次，则为正数，否则返回负数。

JavaScript 的实现如下：
```js
const singleNumber = function (nums) {
  const positiveNum = nums.map((num) => Math.abs(num));
  const maxBitLen = Math.max(...positiveNum).toString(2).length;
  const binaryStrArr = positiveNum.map((num) => num.toString(2));
  const binarySumArr = [];
  for (let i = 1; i <= maxBitLen; i++) {
    binarySumArr[maxBitLen - i] = 0;
    binaryStrArr.forEach((numStr) => {
      binarySumArr[maxBitLen - i] += parseInt(
        numStr.charAt(numStr.length - i) || 0,
        10
      );
    });
  }
  const resBitArr = binarySumArr.map((num) => parseInt(num, 10) % 3);
  const res = parseInt(resBitArr.join(''), 2);
  const isResPositive = nums.filter((num) => num === res).length === 1;

  return isResPositive ? res : -res;
};
```

