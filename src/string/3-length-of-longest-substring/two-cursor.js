const lengthOfLongestSubstring = function (s) {
  if (s.length === 0) {
    return 0;
  }
  let max = 0;
  let start = 0;
  let end = 0;
  const count = {};

  for (; end < s.length; end++) {
    count[s[end]] = (count[s[end]] || 0) + 1;
    while (isRepeat(count) && start < end) {
      count[s[start]] = (count[s[start]] || 0) - 1;
      start++;
    }
    if (!isRepeat(count)) {
      max = Math.max(max, end - start + 1);
    }
  }
  return max;
};

function isRepeat(count) {
  return Object.values(count).findIndex((c) => c > 1) !== -1;
}