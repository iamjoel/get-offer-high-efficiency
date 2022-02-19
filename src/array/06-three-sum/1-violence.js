/**
 * 穷举所有可能。超出时间限制。。。
 */
const threeSum = function (nums) {
  if (nums.length < 3) {
    return [];
  }
  if (nums.every((item) => item === 0)) {
    return [[0, 0, 0]];
  }
  // 去掉重复2次及以上的情况
  const filteredNums = filterTwiceMore(nums);
  const res = [];
  const len = filteredNums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      for (let k = j + 1; k < len; k++) {
        if (filteredNums[i] + filteredNums[j] + filteredNums[k] === 0) {
          res.push([filteredNums[i], filteredNums[j], filteredNums[k]]);
        }
      }
    }
  }
  return uniq(res);
};

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
