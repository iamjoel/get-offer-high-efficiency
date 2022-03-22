/**
 * 将数组中所有数字转化成二进制，右对齐，每位求和，除以3，结果就是只出现一次的数字的二进制。
 * 要注意的是，可能会存在负数。我这边是把负数全部转化成正数。最后找到的正数去原数组里找，如果是1个则返回，否则返回负数。
 */
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
