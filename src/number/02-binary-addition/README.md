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

### 算法2 
JavaScript 的实现如下：
```js
```


完整代码：

