/**
 * 1. 将时间转化成分钟
 * 2. 从小到大排序。
 * 注意：在计算最小时间差时，需要把排序之后的第1个时间当作第2天的时间（即加上24小时）与最后一个时间之间的间隔也考虑进去。在最后一位要加上第一位的24小时。
 *  [00:00, 14:00] => [00: 00, 14: 00, 24: 00]
 * 3. 计算相邻两位的差值，找最小值。
 */
const ONE_DAY_MINUTE = 24 * 60
const findMinDifference = function(timePoints) {
  if(timePoints.length <= 1) {
    return 0;
  }
  const minutes = timePoints.map(time => toMinute(time));
  minutes.sort((a, b) => a - b);
  const diff = minutes.map((m, i) => {
    if(i === 0) { // 最后一个和第一个的差值。
      return m + ONE_DAY_MINUTE - minutes[minutes.length - 1];
    }
    return m - minutes[i - 1];
  })
  const min = Math.min(...diff);
  return min;
};

function toMinute(time) {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}