/**
 * @param {number[][]} nums
 * @return {number}
 * dp[n][c] 第n个房子，粉刷颜色 c 的最小代价
 * 整个的最小代价为 min(dp[n][红],dp[n][绿],dp[n][蓝])
 * dp[n][c] = min(dp[n-1][非c] + cost[n][c])
 */
const minCost = function(costs) {
    let len = costs.length
    if(len === 0) {
        return 0
    }
    const dp = [] // 第n个房子，粉刷颜色 c 的最小代价
    for(let i = 0; i < len; i++) {
        dp[i] = []
    }
    calculate(costs, len - 1, dp)
    return Math.min(...dp[len - 1])
};

const calculate = (costs, n, dp) => {
    if(dp[n].length > 0) {
        return
    }

    if(n === 0) {
        dp[0] = [...costs[0]]
    } else {
        calculate(costs, n - 1, dp)
        for(let i = 0; i < 3; i++) {
            let itemCost = []
            for(let j = 0; j < 3; j++) {
                if(i !== j) { // 颜色不同的值
                    itemCost.push(dp[n-1][j] + costs[n][i])
                }
            }
            dp[n][i] = Math.min(...itemCost)
        }
    }
}

console.log(minCost([[17,2,17]]))
console.log(minCost([[17,2,17],[16,16,5],[14,3,19]]))
