// 注意： 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量
const minWindow = function (s, t) {
  if (s.length === 0 || t.length === 0) {
    return '';
  }

  const uniqT = uniq(t);
  const count = {};
  let min = Number.MAX_VALUE;
  let res = '';

  let start = 0;
  let end = 0;

  for (; end < s.length; ) {
    count[s[end]] = (count[s[end]] || 0) - 1;
    if (isInclude(count, uniqT)) {
      let currLen = end - start + 1;
      if (currLen < min) {
        min = currLen;
        res = s.slice(start, end + 1);
      }
      if (start < end) {
        count[s[start]] = (count[s[start]] || 0) + 1;
        start++;
      } else {
        end++;
      }
    } else {
      end++;
    }
  }
  return res;
};

function isInclude(count, str) {
  let flag = true;
  str.split('').forEach((s) => {
    if (count[s] > 0) {
      flag = false;
    }
  });
  return flag;
}

function uniq(str) {
  const res = [];
  const cache = {};
  str.split('').forEach((s) => {
    if (!cache[s]) {
      res.push(s);
      cache[s] = true;
    }
  });
  return res.join('');
}

console.log(minWindow("ADOBECODEBANC", "ABC")) // "BANC"