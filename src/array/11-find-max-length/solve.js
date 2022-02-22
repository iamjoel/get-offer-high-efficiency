/**
 * 将 0 改成 -1，就会把问题转换成 和是0的最长的串
 */
const findMaxLength = function (nums) {
  let count = 0;
  let sum = 0;
  const sumCach = { 0: 1 }; // 和是0的值，初始化有一个。

  nums.forEach((num) => {
    sum += num === 0 ? -1 : 1;
    count = Math.max(count, sumCach[sum] || 0);
    sumCach[sum] = (sumCach[sum] || 0) + 1;
  });

  return count;
};
