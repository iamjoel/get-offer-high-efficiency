/**
 * 暴力解法。遍历所有数字，一个个算。
 */
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
