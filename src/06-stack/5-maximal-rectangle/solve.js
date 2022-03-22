/*
* 按行切，可以转化成上一题
*/
const maximalRectangle = (matrix) => {
  if (!matrix || !matrix.length) {
    return 0;
  }
  const cols = [];
  const colsLength = matrix[0].length;
  for (let col = 0; col < colsLength; col++) {
    cols[col] = [];
  }
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < colsLength; col++) {
      cols[col][row] = matrix[row][col];
    }
  }

  const maxArr = matrix.map((row, rowIndex) => {
    const currCols = cols.map((c) => {
      const currCol = c.slice(0, rowIndex + 1);
      const height = getHeight(currCol);
      return height;
    });
    return largestRectangleArea(currCols);
  });

  const max = Math.max(...maxArr);
  return max;
};

function getHeight(arr) {
  let height = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === '1') {
      height++;
    } else {
      break;
    }
  }
  return height;
}

function largestRectangleArea(heights) {
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
    const width =
      heights.length - (stack.length ? stack[stack.length - 1] + 1 : 0);
    const area = width * height;
    maxArea = Math.max(maxArea, area);
  }
  return maxArea;
}