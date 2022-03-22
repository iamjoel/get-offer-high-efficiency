// 统计各字母的出现的次数
const isAnagram = function (s, t) {
  if (s === t || s.length !== t.length) {
    return false;
  }

  const sAlphaCount = getAlphaCount(s);
  const tAlphaCount = getAlphaCount(t);
  return Object.keys(sAlphaCount).every(
    (c) => sAlphaCount[c] === tAlphaCount[c]
  );
};

function getAlphaCount(s) {
  const alphaCount = {};
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (!alphaCount[char]) {
      alphaCount[char] = 1;
    } else {
      alphaCount[char]++;
    }
  }
  return alphaCount;
}
