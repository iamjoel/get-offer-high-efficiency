/**
 * 将单词转化成数字，然后比较每每一位是否是排序的
 * 从第一个单词往后，依次比较相邻居的两个单词是否是排序的。
 */
const isAlienSorted = function (words, order) {
  const orderMap = getOrderMap(order);
  let i = 0;
  while (i < words.length - 1) {
    if (!compare(words[i], words[i + 1], orderMap)) {
      return false;
    }
    i++;
  }
  return true;
};

function getOrderMap(order) {
  const orderMap = {};
  order.split('').forEach((c, index) => {
    orderMap[c] = index + 1;
  });
  return orderMap;
}

function compare(w1, w2, orderMap) {
  let i = 0;
  while (i < w1.length && i < w2.length) {
    if (orderMap[w1[i]] > orderMap[w2[i]]) {
      return false;
    }
    if (orderMap[w1[i]] < orderMap[w2[i]]) {
      return true;
    }
    i++;
  }
  // 前面都相同，但 w1 更长。
  if(w1.length > w2.length) {
    return false;
  }
  return true;
}
