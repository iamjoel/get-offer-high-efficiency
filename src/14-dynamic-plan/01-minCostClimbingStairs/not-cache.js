/**
 * @param {number[]} cost
 * @return {number}
 * dp(n) 最后一步是第n个台阶的最优解法
 * 走完台阶：最后一步走第n个 或 走 n-1 个
 * dp(n) = min(dp(n - 1), dp(n - 2)) + cost[n]
 */
const minCostClimbingStairs = function(cost) {
    let len = cost.length
    if(len <= 1) {
        return 0
    } else if(len === 2) {
        return Math.min(cost[0], cost[1])
    }
    return Math.min(calculate(cost, len - 1), calculate(cost, len - 2))
};

const calculate = (cost, n) => {
    if(n < 2) {
        return cost[n]
    } else {
        return Math.min(calculate(cost, n - 1), calculate(cost, n - 2)) + cost[n]
    }
}

console.log(minCostClimbingStairs([10, 15, 20]))
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]))
console.log(minCostClimbingStairs([1, 100]))
