/*
 * 将字符串转化出十进制的整数，求和后转化成二进制的字符串。
 * 注意: 该算法有问题。到字符串足够大，会出现整数溢出的情况。
 */
const addBinary = function (left, right) {
  const leftNum = parseInt(left, 2);
  const rightNum = parseInt(right, 2);
  const resNum = leftNum + rightNum;
  const resStr = resNum.toString(2);
  return resStr;
};
