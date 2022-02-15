/*
 * 将字符串转换成数组。每位进行相加。
 */
const addBinary = function (left, right) {
  const leftArr = toNumberArr(left);
  const leftLen = leftArr.length;
  const rightArr = toNumberArr(right);
  const rightLen = rightArr.length;
  const maxLen = Math.max(leftLen, rightLen);

  const sumArr = [];

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
