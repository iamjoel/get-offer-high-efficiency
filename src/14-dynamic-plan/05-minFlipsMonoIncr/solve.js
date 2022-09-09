/**
 * @param {string} s
 * @return {number}
 * 翻转，直到所有0在1前面
 * dp[n][num] 长度是n的字符串, 反转后最后一位是num的最小次数。num 是可能是 0 或 1。
 * 转移方程，以下2种情况的最小值:
 * 1. num != s[n]。 d[n - 1][num] + 1
 * 2. num == s[n]。 d[n-1][num]
 * 最优解 min(dp[n][0], dp[n][1])
 * TODO: 有问题。
 */
var minFlipsMonoIncr = function(s) {
    let len = s.length
    if(len <= 1) {
        return 0
    }
    const dp = [] // 长度是n的字符串, 反转后最后一位是num的最小次数
    for(let i = 0; i < len; i++) {
        dp[i] = []
    }
    calculate(s, len - 1, dp)
    
    return Math.min(dp[len - 1][0], dp[len - 1][1])
};

const calculate = (s, n, dp) => {
    if(dp[n].length > 0) {
        return
    }
    if(n === 0) {
        dp[n][0] = s[0] === '0' ? 0 : 1
        dp[n][1] = s[0] === '1' ? 0 : 1
    } else {
        calculate(s, n - 1, dp)
        dp[n][0] = Math.min(
            dp[n - 1][0],
            dp[n - 1][1] + 1,
        )
        dp[n][1] = Math.min(
            dp[n - 1][0] + 1,
            dp[n - 1][1],
        )
    }
    
}

console.log(minFlipsMonoIncr('00110'))
console.log(minFlipsMonoIncr('010110'))