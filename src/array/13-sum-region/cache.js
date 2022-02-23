/**
 * sumCache 有左上角为起点的所有的子矩阵的和。
 */
const NumMatrix = function (matrix) {
  const sumCache = [];
  for (let row = 0; row < matrix.length; row++) {
    sumCache[row] = [];
    if (row === 0) {
      let rowSum = 0;
      for (let col = 0; col < matrix[0].length; col++) {
        rowSum += matrix[0][col]
        sumCache[0][col] = rowSum;
      }
      continue;
    }
    let rowSum = 0;
    for (let col = 0; col < matrix[0].length; col++) {
      rowSum += matrix[row][col];
      sumCache[row][col] = sumCache[row - 1][col] + rowSum;
    }
  }
  this.sumCache = sumCache;
};

/**
 * 下标从 0 开始。row1  其实是 row1 + 1
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  const sumCache = this.sumCache;
  return (
    sumCache[row2][col2] -
    (row1 > 0 ? sumCache[row1 - 1][col2] : 0) -
    (col1 > 0 ? sumCache[row2][col1 - 1] : 0) +
    (row1 > 0 && col1 > 0 ? sumCache[row1 - 1][col1 - 1] : 0)
  );
};


// const matrix = new NumMatrix([
//   [3,0,1,4,2],
//   [5,6,3,2,1],
//   [1,2,0,1,5],
//   [4,1,0,1,7],
//   [1,0,3,0,5]
// ])
// console.log(matrix.sumRegion(2,1,4,3)) 8