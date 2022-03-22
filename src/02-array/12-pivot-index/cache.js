/**
 * 缓存值
 */
 const pivotIndex = function (nums) {
  const sumCache = []; // 前 n 个，不包含 n
  let sumTotal = 0;
  nums.forEach((num) => {
    sumCache.push(sumTotal);
    sumTotal += num;
  });

  for (let i = 0; i <= nums.length - 2; i++) {
    if (sumCache[i] === sumTotal - sumCache[i + 1]) {
      return i;
    }
  }
  if (sumCache[nums.length - 1] === 0) {
    return nums.length - 1;
  }
  return -1;
};