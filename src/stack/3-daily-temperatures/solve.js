// 存当前没找到最大值的温度下标。在没找到的数组头部找，把找到的所有大于的值都出栈，直到栈空或小于。当前值如栈。
const dailyTemperatures = function (temperatures) {
  if (!temperatures || !temperatures.length) return [];
  let res = temperatures.map(() => 0);
  let notFoundArr = [];
  for (let currIndex = 0; currIndex < temperatures.length; currIndex++) {
    const currValue = temperatures[currIndex];
    while(notFoundArr.length > 0) {
      const prevIndex = notFoundArr[notFoundArr.length - 1];
      const prevValue = temperatures[prevIndex];
      if (currValue > prevValue) {
        res[prevIndex] = currIndex - prevIndex;
        notFoundArr.pop();
      } else {
        break;
      }
    }
    notFoundArr.push(currIndex);
  }
  return res;
};

// console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));  // [1, 1, 4, 2, 1, 1, 0, 0]