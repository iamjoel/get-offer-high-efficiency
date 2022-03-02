/**
 * 两边向中间遍历
 */
const isPalindrome = function (s) {
  const letterNumberStr = s
    .split('')
    .filter((c) => /[0-9a-zA-Z]/.test(c))
    .join('');
  const formatedStr = letterNumberStr.toLowerCase();

  const len = formatedStr.length;
  const isEvenLen = len % 2 === 0;
  const middleEndIndex = isEvenLen ? len / 2 - 1 : Math.floor(len / 2);

  for (let i = 0; i <= middleEndIndex; i++) {
    if (formatedStr[i] !== formatedStr[len - i - 1]) {
      return false;
    }
  }
  return true;
};
