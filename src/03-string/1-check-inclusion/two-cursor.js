const checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) {
    return false;
  }
  const count = {};
  for (let i = 0; i < s1.length; i++) {
    count[s1[i]] = (count[s1[i]] || 0) + 1;
    count[s2[i]] = (count[s2[i]] || 0) - 1;
  }

  if (isAllZero(count)) {
    return true;
  }

  let start = 0;
  let end = start + s1.length;
  for (; end < s2.length; start++, end++) {
    count[s2[start]] = (count[s2[start]] || 0) + 1; // 出
    count[s2[end]] = (count[s2[end]] || 0) - 1; // 入
    if (isAllZero(count)) {
      return true;
    }
  }
  return false;
};

function isAllZero(count) {
  return Object.values(count).every((c) => c === 0);
}
