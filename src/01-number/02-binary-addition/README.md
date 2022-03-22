# [二进制加法](https://leetcode-cn.com/problems/JFETK5/)
## 题
给定两个 01 字符串 a 和 b ，请计算它们的和，并以二进制字符串的形式输出。

输入为 非空 字符串且只包含数字 1 和 0。
## 解决方案
### 算法1 转化成整数求和
将字符串转化出十进制的整数，求和后转化成二进制的字符串。JavaScript 的实现如下：
```js
const addBinary = function (left, right) {
  const leftNum = parseInt(left, 2);
  const rightNum = parseInt(right, 2);
  const resNum = leftNum + rightNum;
  const resStr = resNum.toString(2);
  return resStr;
};
```

该算法存在的问题是：当求和的字符串足够大，会出现整数溢出的情况。

### 算法2 位数对齐相加
1. 将字符串转换成数组。
2. 右对齐，每位进行相加。
3. 将结果数组转化成字符串。

JavaScript 的实现如下：
```js
const addBinary = function (left, right) {
  const leftArr = toNumberArr(left);
  const leftLen = leftArr.length;
  const rightArr = toNumberArr(right);
  const rightLen = rightArr.length;
  const maxLen = Math.max(leftLen, rightLen);

  const sumArr = [];

  // 是否进位
  let isCarry = false;
  for (let i = 1; i <= maxLen; i++) {
    const res = add(leftArr[leftLen - i], rightArr[rightLen - i], isCarry);
    sumArr[maxLen - i] = res.sum;
    isCarry = res.isCarry;
  }
  const tempSum = sumArr.join('');
  const sum = isCarry ? `1${tempSum}` : tempSum;
  return sum;
};

/*
 * 一位的运算
 */
function add(left, right, isCarry) {
  const sum = (left || 0) + (right || 0) + (isCarry ? 1 : 0);
  if (sum > 1) {
    return {
      sum: sum - 2,
      isCarry: true,
    };
  }
  return {
    sum,
    isCarry: false,
  };
}

function toNumberArr(str) {
  return str.split('').map((item) => parseInt(item, 10));
}
```
