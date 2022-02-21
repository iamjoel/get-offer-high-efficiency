/**
 * 双指针去实现，从第一个开始，一个个的加或简。
 */
const minSubArrayLen = function (target, nums) {
  nums.sort((a, b) => a - b);
  if (nums[0] >= target) {
    return 1;
  }

  let startIndex = 0;
  let endIndex = 0;
  let sum = nums[0];

  while (startIndex <= endIndex && endIndex < nums.length - 1) {
    if (sum < target) {
      endIndex++;
      sum += nums[endIndex];
    } else {
      sum -= nums[startIndex];
      startIndex--;
    }
  }

  const count = endIndex - startIndex + 1;
  return sum < target ? 0 : count;
};
