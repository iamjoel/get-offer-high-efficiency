/**
 * 从中间往两边，回文是奇数和偶数的情况。
 */
 const countSubstrings = function (s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    count += findPalindromeByCenter(s, i, i);
    count += findPalindromeByCenter(s, i, i + 1);
  }
  return count;
};

// 偶数是 c2 = c1 + 1; 奇数时 c1 = c2
function findPalindromeByCenter(s, c1, c2) {
  let count = 0;
  while (c1 >= 0 && c2 < s.length) {
    if (isPalindrome(s.slice(c1, c2 + 1))) {
      count += 1;
    }
    c1--;
    c2++;
  }
  return count;
}

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