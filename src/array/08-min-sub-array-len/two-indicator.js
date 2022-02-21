/**
 * 双指针去实现，固定尾部，往前去找。
 */
const minSubArrayLen = function (target, nums) {
  let startIndex = 0;
  let sum = 0;
  let count = Number.MAX_VALUE;

  for (let endIndex = 0; endIndex < nums.length; endIndex++) {
    sum += nums[endIndex];
    while (sum >= target && startIndex <= endIndex) {
      count = Math.min(count, endIndex - startIndex + 1);
      sum -= nums[startIndex];
      startIndex++; // 尝试少一个数字
    }
  }

  return count === Number.MAX_VALUE ? 0 : count;
};
