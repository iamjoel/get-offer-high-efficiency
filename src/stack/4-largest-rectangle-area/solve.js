const largestRectangleArea = function (heights) {
  if (!heights || !heights.length) {
    return 0;
  }
  let maxArea = 0;
  const stack = [];

  for (let i = 0; i < heights.length; i++) {
    let currHeight = heights[i];
    while (stack.length && currHeight < heights[stack[stack.length - 1]]) {
      const heightIndex = stack.pop();
      const height = heights[heightIndex];
      const width = i - (stack.length ? stack[stack.length - 1] + 1 : 0);
      const area = width * height;
      maxArea = Math.max(maxArea, area);
      
    }
    stack.push(i);
  }

  // 计算栈中以每个柱子为顶的矩形面积。
  while (stack.length) {
    const heightIndex = stack.pop();
    const height = heights[heightIndex];
    const width =  heights.length - (stack.length ? stack[stack.length - 1] + 1 : 0);
    const area = width * height;
    maxArea = Math.max(maxArea, area);
  }
  return maxArea;
};

// console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));
// console.log(largestRectangleArea([2, 4]));
// console.log(largestRectangleArea([2, 1, 2]));