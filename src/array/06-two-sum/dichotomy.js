/**
 * 求和用二分法来实现
 * 会超出时间限制
 */
const twoSum = function (numbers, target) {
  for (let leftIndex = 0; leftIndex < numbers.length; leftIndex++) {
    let rightIndex = numbers.length - 1;

    while (leftIndex < rightIndex) {
      let left = numbers[leftIndex];
      let right = numbers[rightIndex];

      if (left + right === target) {
        return [leftIndex, rightIndex];
      }
      if (left + right > target) {
        rightIndex = Math.ceil((leftIndex + rightIndex) / 2);
      } else {
        break;
      }
    }
  }
};
