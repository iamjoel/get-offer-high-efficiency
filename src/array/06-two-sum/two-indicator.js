/**
 * 双指针来实现。左指向头，右指向尾。大于目标则右指针左移；否则左指针右移。
 */
const twoSum = function (numbers, target) {
  let leftIndex = 0;
  let rightIndex = numbers.length - 1;

  for (let i = 0; i < numbers.length; i++) {
    let left = numbers[leftIndex];
    let right = numbers[rightIndex];
    if (left + right === target) {
      return [leftIndex, rightIndex];
    }
    if (left + right > target) {
      rightIndex--;
    } else {
      leftIndex++;
    }
  }
};
