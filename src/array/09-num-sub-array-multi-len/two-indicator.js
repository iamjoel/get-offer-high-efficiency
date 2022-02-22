/**
 * 双指针去实现，固定尾部，往前去找。
 */
 const numSubarrayProductLessThanK = function (nums, target) {
  let startIndex = 0;
  let res = 1;
  let count = 0;

  for (let endIndex = 0; endIndex < nums.length; endIndex++) {
    res *= nums[endIndex];
    while (res >= target && startIndex <= endIndex) {
      res /= nums[startIndex];
      startIndex++; // 尝试少一个数字
    }
    count += endIndex - startIndex + 1; // 1 到 n 的组合
  }

  return count;
};
