/**
 * sumCache 有左上角为起点的所有的子矩阵的和。
 */
const NumMatrix = function (matrix) {
  const sumCache = [];
  for (let row = 0; row < matrix.length; row++) {
    sumCache[row] = [];
    if (row === 0) {
      sumCache[0] = [...matrix[0]];
      continue;
    }
    let rowSum = 0;
    for (let col = 0; col < matrix[0].length; row++) {
      if (col === 0) {
        sumCache[row][0] = matrix[row][0];
        rowSum += matrix[row][col];
        continue;
      }
      sumCache[row][col] = sumCache[row][col - 1] + rowSum;
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
    sumCache[row1][col1] -
    (row1 > 0 ? sumCache[row1 - 1][col2] : 0) -
    (col1 > 0 ? sumCache[row2][col1 - 1] : 0) +
    (row1 > 0 && col1 > 0 ? sumCache[row1][col1] : 0)
  );
};
