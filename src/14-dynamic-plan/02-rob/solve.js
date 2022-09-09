/**
 * @param {number[]} nums
 * @return {number}
 * dp(n) 最后一步是第n个台阶的最优解法
 * 走完台阶：最后一步走第n个 或 走 n-1 个
 * dp(n) = min(dp(n - 1), dp(n - 2)) + cost[n]
 */
const rob = function(nums) {
    let len = nums.length
    if(len === 0) {
        return 0
    } else if(len === 1) {
        return nums[0]
    } else if(len === 2) {
        return Math.max(nums[0], nums[1])
    }
    const dp = [] // 偷第 n 个房子的最大金额。
    calculate(nums, len - 1, dp)
    return Math.max(dp[len - 3] + nums[len - 1], dp[len - 2])
};

const calculate = (nums, n, dp) => {
    if(dp[n] !== undefined) {
        return
    }

    if(n === 0) {
        dp[n] = nums[0]
    } else if (n === 1) {
        dp[n] = Math.max(nums[0], nums[1])
    } else if (dp[n] === undefined) {
        calculate(nums, n - 2, dp)
        calculate(nums, n - 1, dp)
        dp[n] = Math.max(dp[n - 2] + nums[n], dp[n - 1]) 
    }
}

console.log(rob([1,2,3,1]))
console.log(rob([2,7,9,3,1]))
console.log(rob([1, 100]))
