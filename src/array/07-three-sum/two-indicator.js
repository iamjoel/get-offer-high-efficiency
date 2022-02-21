/**
 * 用两数求和的基础上处理
 */
const threeSum = function (nums) {
  if (nums.length < 3) {
    return [];
  }
  const filteredNums = filterTwiceMore(nums);
  filteredNums.sort((a, b) => a - b); // 从小到大排序
  const res = [];
  let prevNum;
  for (let i = 0; i < filteredNums.length - 2; i++) {
    const currNum = filteredNums[i];
    if (currNum === prevNum) {
      prevNum = currNum;
      continue;
    }
    prevNum = currNum;
    const target = 0 - currNum;
    const twoSumRes = twoSum(filteredNums.slice(i), target);
    res.push(...[twoSumRes.map((item) => [currNum, ...item])]);
  }
  return uniq(res);
};

/**
 * 双指针来实现。左指向头，右指向尾。大于目标则右指针左移；否则左指针右移。
 */
function twoSum(numbers, target) {
  const res = [];
  let leftIndex = 0;
  let rightIndex = numbers.length - 1;

  for (let i = 0; i < numbers.length; i++) {
    let left = numbers[leftIndex];
    let right = numbers[rightIndex];
    if (left + right === target) {
      res.push([leftIndex, rightIndex]);
      leftIndex++;
      continue;
    }
    if (left + right > target) {
      rightIndex--;
    } else {
      leftIndex++;
    }
  }
  return res;
}

function filterTwiceMore(arr) {
  const res = [];
  const count = {};
  arr.forEach((item) => {
    if (count[item] === undefined) {
      count[item] = 0;
    }
    count[item] = count[item] + 1;
  });
  Object.keys(count).forEach((k) => {
    if (count[k] === 1) {
      res.push(parseInt(k, 10));
    }
    if (count[k] > 1) {
      res.push(parseInt(k, 10));
      res.push(parseInt(k, 10));
      if (k === '0' && count[k] >= 3) {
        res.push(parseInt(k, 10));
      }
    }
  });
  return res;
}

function uniq(arr) {
  const res = [];

  const sortedArrStr = arr.map((item) => {
    const cloneArr = [...item];
    cloneArr.sort((a, b) => a - b);
    return cloneArr.toString();
  });

  const exist = {};
  sortedArrStr.forEach((item, index) => {
    if (!exist[item]) {
      exist[item] = true;
      res.push(arr[index]);
      return;
    }
  });
  return res;
}
