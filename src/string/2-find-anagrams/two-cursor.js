const findAnagrams = function (s2, s1) {
  const res = [];
  if (s1.length > s2.length) {
    return [];
  }
  const count = {};
  for (let i = 0; i < s1.length; i++) {
    count[s1[i]] = (count[s1[i]] || 0) + 1;
    count[s2[i]] = (count[s2[i]] || 0) - 1;
  }

  if (isAllZero(count)) {
    res.push(0);
  }

  let start = 1;
  let end = start + s1.length - 1;
  for (; end < s2.length; start++, end++) {
    count[s2[start]] = (count[s2[start]] || 0) + 1; // 出
    count[s2[end]] = (count[s2[end]] || 0) - 1; // 入
    if (isAllZero(count)) {
      res.push(start);
    }
  }
  return res;
};

function isAllZero(count) {
  return Object.values(count).every((c) => c === 0);
}

findAnagrams('cbaebabacd', 'abc'); // [0, 6]
