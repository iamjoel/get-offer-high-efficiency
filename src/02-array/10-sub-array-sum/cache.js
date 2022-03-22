/**
 * 数组的前i个数字之和记为x。如果存在一个j（j＜i），数组的前j个数字之和为sum-k，那么数组中从第i+1个数字开始到第j个数字结束的子数组之和为k。 k = sum - (sum - k)
 */
const subarraySum = function (nums, k) {
  let count = 0;
  let sum = 0;
  const sumCache = { 0: 1 }; // 和是0的值，初始化有一个。

  nums.forEach((num) => {
    sum += num;
    count += sumCache[sum - k] || 0;
    sumCache[sum] = (sumCache[sum] || 0) + 1;
  });

  return count;
};
