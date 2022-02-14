# [整数除法](https://leetcode-cn.com/problems/xoh6Oh/)
## 题
给定两个整数 a 和 b ，求它们的除法的商 a/b ，要求不得使用乘号 '\*'、除号 '/' 以及求余符号 '%' 。

## 解决方案
### 算法1  用减法来实现除法
用减法来实现除法。用被除数减除数，直到被除数小于除数为止。JavaScript 的实现如下：
```js
const times = 0;
while (left >= right) {
    left -= right;
    times++;
}
```

该算法存在一个问题。当被除数很大但除数很小时，减法操作执行的次数会很多。

完整代码：https://stackblitz.com/edit/get-offer-high-efficiency?file=src/number/01-divide/1-basic.js

### 算法2:  除数2倍法
探测除数是否大于除数的2倍。如果是，则继续判断被除数是否大于除数的4倍、8倍...2n倍，直到被除数大于被除数。此时，将被除数减去除数的2n倍，余数重复前面的步骤。JavaScript 的实现如下：
```js
let times = 0;
let rest = left;
while (rest >= right) {
let res = getMaxTimes(rest, right);
rest = res.rest;
times += res.times;
}

function getMaxTimes(left, right) {
  let times = 1;
  let prevRight = right;
  right += right;
  
  while (left >= right) {
    prevRight = right;
    right += right;
    times += times;
  }
  return {
    times,
    rest: left - prevRight,
  };
}
```

完整代码：https://stackblitz.com/edit/get-offer-high-efficiency?file=src/number/01-divide/2-effective.js

### 算法3: 位数估算法
1. 将被除数和除数转化成字符串。用字符串长度的差值来决定大体的倍数。比如 `600 / 5`，则倍数是100。 
2. 用被除数和除数的最高位来决定精确一点的倍数估值： 
   1. 如果除数的最高值是1，则倍数的第一位是被除数最高位的值。比如： `623 / 13`，则倍数为 60。
   2. 除数和被除数的最高位相同，倍数的最高位置1。除数的最高位值大于被除数，倍数的位数减1。 `623 / 73`，则倍数为 10。
   3. 否则倍数的最高为1。
3. 被除数减去 `除数 * 倍数估值`。对结果值用 算法1 或 算法2 来做修正。

## 边界值和异常的处理
要处理以下情况
* 被除数为零的情况。被除数数为零没有意义。
* 除数为零。结果为零。
* 结果的符号。被除数和除数为符号相同，则结果为正，否则为负。
* 除数为1或-1的处理。