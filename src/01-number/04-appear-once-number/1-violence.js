/**
 * 计算数组中所有数字出现的次数。筛选出只出现一次的。
 */
const singleNumber = function (nums) {
  const count = {};
  nums.forEach((item) => {
    if (!count[item]) {
      count[item] = 1;
    } else {
      count[item] = count[item] + 1;
    }
  });
  let res;
  Object.keys(count).forEach((key) => {
    const value = count[key];
    if (value === 1) {
      res = key;
    }
  });
  return res;
};
