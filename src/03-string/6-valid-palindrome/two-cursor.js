/**
 * 尝试删除前面的一个或后面的一个
 */
const validPalindrome = function (s) {
  const len = s.length;
  const isEvenLen = len % 2 === 0;
  const middleEndIndex = isEvenLen ? len / 2 - 1 : Math.floor(len / 2);

  let isAlreadyPalindrome = true;
  let i = 0;
  for (; i <= middleEndIndex; i++) {
    if (s[i] !== s[len - i - 1]) {
      isAlreadyPalindrome = false;
      break;
    }
  }

  if (isAlreadyPalindrome) {
    return true;
  }

  const res =
    isPalindrome(removeChar(s, i)) ||
    isPalindrome(removeChar(s, len - i - 1, 1));

  return res;
};

function isPalindrome(s) {
  const len = s.length;
  const isEvenLen = len % 2 === 0;
  const middleEndIndex = isEvenLen ? len / 2 - 1 : Math.floor(len / 2);

  for (let i = 0; i <= middleEndIndex; i++) {
    if (s[i] !== s[len - i - 1]) {
      return false;
    }
  }
  return true;
}

function removeChar(s, removeIndex) {
  const left = s.slice(0, removeIndex);
  const right = s.slice(removeIndex + 1);
  return left + right;
}
