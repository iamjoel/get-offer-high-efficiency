/**
 * @param {number[]} cost
 * @return {number}
 * 这边要拿最小步骤走的过程: 走的是哪几个台阶
 * dp(n) 最后一步是第n个台阶的最优解法
 * 走完台阶：最后一步走第n个 或 走 n-1 个
 * dp(n) = min(dp(n - 1), dp(n - 2)) + cost[n]
 */
const minCostClimbingStairs = function(cost) {
    let len = cost.length
    const dp = [] // 最后一步是第n个台阶的最优解法。
    const steps = [] // 过程
    calculate(cost, len - 1, dp, steps)
    console.log(dp)
    if(dp[len - 1] <  dp[len - 2]) {
        steps[len] = steps[len - 1]
    } else {
        steps[len] = steps[len - 2]
    }
    console.log(steps)
    return Math.min(dp[len - 1], dp[len - 2])
};

const calculate = (cost, n, dp, steps) => {
    if(n < 2) {
        dp[n] = cost[n]
        steps[n] = [n]
    } else if(dp[n] === undefined) {
        calculate(cost, n - 2, dp, steps)
        calculate(cost, n - 1, dp, steps)
        if(dp[n - 1] < dp[n - 2]) {
            steps[n] = [...steps[n - 1]]
        } else {
            steps[n] = [...steps[n - 2]]
        }
        steps[n].push(n)
        dp[n] = Math.min(dp[n - 1], dp[n - 2]) + cost[n]
    }
}

console.log(minCostClimbingStairs([10, 15, 20]))
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]))
