/**
 * 左侧的值 = 和处以2
 * 把前n个数的下标都存起来。 sumCache[n] = sumTotal / 2。 结果是 n + 1
 */
const pivotIndex = function (nums) {
  const sumCache = {
    0: -1,
  };
  let sumTotal = 0;
  nums.forEach((num, i) => {
    sumTotal += num;
    sumCache[sumTotal] = i;
  });

  if (sumTotal % 2 === 1) {
    return -1;
  }

  const average = sumTotal / 2;
  const resIndex = sumCache[average] !== undefined ? sumCache[average] + 1 : -1;
  return resIndex;
};
