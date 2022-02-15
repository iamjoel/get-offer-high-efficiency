/**
 * 如果正整数i是一个偶数，那么i相当于将“i/2”左移一位的结果，因此偶数i和“i/2”的二进制形式中1的个数是相同的。
 * 如果i是奇数，那么i相当于将“i/2”左移一位之后再将最右边一位设为1的结果，因此奇数i的二进制形式中1的个数比“i/2”的1的个数多1。
 */
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
