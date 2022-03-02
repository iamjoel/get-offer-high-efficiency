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

  for (let i = 0; i < t.length; i++) {
    count[t[i]] = (count[t[i]] || 0) + 1;
  }

  for (; end < s.length; ) {
    count[s[end]] = (count[s[end]] || 0) - 1;

    while (isInclude(count, uniqT) && start <= end) {
      let currLen = end - start + 1;
      if (currLen < min) {
        min = currLen;
        res = s.slice(start, end + 1);
      }
      if (start < end) {
        count[s[start]] = (count[s[start]] || 0) + 1;
        start++;
      } else {
        break;
      }
    }

    end++;
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
