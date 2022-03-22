/**
 * min(arr) * arr.length
 * 分治法：最高值，要么穿过最小值。要么在左侧（递归），要么在右侧（递归）。
*/
const largestRectangleArea = function (heights) {
  if (!heights || !heights.length) {
    return 0;
  }
  let min = heights[0];
  let minIndex = 0;
  for (let i = 1; i < heights.length; i++) {
    if (heights[i] < min) {
      min = heights[i];
      minIndex = i;
    }
  }
  const leftMax = largestRectangleArea(heights.slice(0, minIndex));
  const rightMax = largestRectangleArea(heights.slice(minIndex + 1));
  const maxArea = Math.max(leftMax, min * heights.length, rightMax);
  return maxArea;
};


console.log(largestRectangleArea([2,1,5,6,2,3]));
console.log(largestRectangleArea([2,4]));
