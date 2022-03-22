/*
* 将变位词按照ascii 码排序。再分组。
* 也可以用将一个词变成一个数字来表示。不同的质数表示不同的字母。将单词的每个字母求乘积。对位词的乘积的相同的。这么做，有整数溢出的风险。
*/
const groupAnagrams = function (strs) {
  const group = {};
  const sortedStr = strs.map((str) => sortWord(str));
  sortedStr.forEach((str, i) => {
    if (!group[str]) {
      group[str] = [strs[i]];
    } else {
      group[str].push(strs[i]);
    }
  });
  const res = Object.values(group);
  return res;
};

function sortWord(word) {
  const arr = word.split('');
  arr.sort((a, b) => a.charCodeAt() - b.charCodeAt());
  return arr.join('');
}