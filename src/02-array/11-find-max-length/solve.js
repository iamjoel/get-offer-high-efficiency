/**
 * 将 0 改成 -1，就会把问题转换成 和是0的最长的串
 */
const findMaxLength = function (nums) {
  let count = 0;
  let sum = 0;
  const sumIndexCache = { 0: -1 }; // key 是 和， value 是下标

  nums.forEach((num, i) => {
    sum += num === 0 ? -1 : 1;
    if (sumIndexCache[sum] !== undefined) {
      count = Math.max(count, i - sumIndexCache[sum]);
    } else {
      sumIndexCache[sum] = i;
    }
  });

  return count;
};
