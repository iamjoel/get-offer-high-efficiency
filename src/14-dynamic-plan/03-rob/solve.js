/**
 * @param {number[]} nums
 * @return {number}
 * 转成非环行的。
 * 最大值： 
 * 1. 选第n个房子， 不选相邻的两个。 （求解非环状 num[1...n-2]） + num[n]
 * 2. 不选第n个。 非环状 num[0...n-1]
 */
const rob = function(nums) {
    let len = nums.length
    if(len === 0) {
        return 0
    } else if(len <= 3) {
        return Math.max(...nums)
    }
    
    return Math.max(
        robNoCircle(nums.slice(1, len - 2)) + nums[len - 1],
        robNoCircle(nums.slice(0, len - 1))
    )
};

const robNoCircle = function(nums) {
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

console.log(rob([2,3,2]))
console.log(rob([1,2,3,1]))
console.log(rob([200,3,140,20,10])) // 340
