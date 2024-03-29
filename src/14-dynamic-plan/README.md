# 《剑指Offer：专项突破版》 - 动态规划部分 JavaScript 题解
《剑指Offer：专项突破版》是一个算法题集。该题单包含了程序员在准备面试过程中必备的数据结构与算法知识。具体包含：
- 数据结构：整数、数组、字符串、链表、栈、栈、队列、树、堆和前缀树。
- 算法：二分查找、排序、回溯法、动态规划和图搜索。 

本文来分享下动态规划部分题的解法~

## 动态规划介绍
动态规划的问题都存在若干步骤，并且每个步骤都面临若干选择。如果题目要求列举出所有的解，那么很有可能需要用回溯法解决。如果题目是求一个问题的最优解（通常是求最大值或最小值），或者求问题的解的数目（或判断问题是否存在解），那么这个题目有可能适合运用动态规划。

可以用哈希表缓存递归中的重复性计算。

递归是从问题的结果倒推，直到问题的规模缩小到寻常。 动态规划是从寻常入手， 逐步扩大规模到最优子结构。

动态规划的三个要素
状态转移方程
临界条件
枚举状态

## 题1 - 剑指 Offer II 088. 爬楼梯的最少成本

[题的力扣地址](https://leetcode-cn.com/problems/GzCJIP/)

走完台阶：最后一步走第n个台阶 或 走 n-1 个台阶。用递归，这么写：
```js
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
```

但这么做的问题是，做了很多重复的计算。dp(n) 最后一步是第n个台阶的最优解法。同时，用 dp 来缓存重复的计算结果。

代码如下：

```js
const minCostClimbingStairs = function(cost) {
    let len = cost.length
    if(len <= 1) {
        return 0
    } else if(len === 2) {
        return Math.min(cost[0], cost[1])
    }
    const dp = [] // 最后一步是第n个台阶的最优解法。
    calculate(cost, len - 1, dp)
    return Math.min(dp[len - 1], dp[len - 2])
};

const calculate = (cost, n, dp) => {
    if(n < 2) {
        dp[n] = cost[n]
    } else if(dp[n] === undefined) {
        calculate(cost, n - 2, dp)
        calculate(cost, n - 1, dp)
        dp[n] = Math.min(dp[n - 1], dp[n - 2]) + cost[n]
    }
}
```

## 题2 - 剑指 Offer II 089. 房屋偷盗

[题的力扣地址](https://leetcode-cn.com/problems/Gu0c2T/)

nums 为金额数组。
设 dp[n] 为偷 第 n 个房子的最大金额。
则状态转移方程：dp[n] = max(dp[nums - 2] + nums[n], dp[nums - 1])
金额最大值：偷最后一个房子或最后倒数一个的最大值。

代码如下：

```js
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
```

## 题3 - 剑指 Offer II 090. 环形房屋偷盗

[题的力扣地址](https://leetcode-cn.com/problems/PzWKhm/)

将非环状转化成环状。最大值：
1. 选第n个房子， 不选相邻的两个。 （求解非环状 num[1...n-2]） + num[n]
1. 不选第n个。 非环状 num[0...n-1]

代码如下：

```js
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
```

## 题4 - 剑指 Offer II 091. 粉刷房子

[题的力扣地址](https://leetcode-cn.com/problems/JEj789/)

dp[n][c] 第n个房子，粉刷颜色 c 的最小代价
整个的最小代价为 min(dp[n][红],dp[n][绿],dp[n][蓝])
dp[n][c] = min(dp[n-1][非c] + cost[n][c])

代码如下：

```js
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
```

## 题5 - 剑指 Offer II 092. 翻转字符

[题的力扣地址](https://leetcode-cn.com/problems/cyJERH/)

代码如下：

```js
```

## 题6 - 剑指 Offer II 093. 最长斐波那契数列

[题的力扣地址](https://leetcode-cn.com/problems/Q91FMA/)

代码如下：

```js
```

## 题7 - 剑指 Offer II 094. 最少回文分割

[题的力扣地址](https://leetcode-cn.com/problems/omKAoA/)

代码如下：

```js
```

## 题8 - 剑指 Offer II 095. 最长公共子序列

[题的力扣地址](https://leetcode-cn.com/problems/qJnOS7/)

代码如下：

```js
```

## 题9 - 剑指 Offer II 096. 字符串交织

[题的力扣地址](https://leetcode-cn.com/problems/IY6buf/)

代码如下：

```js
```

## 题10 - 剑指 Offer II 097. 子序列的数目

[题的力扣地址](https://leetcode-cn.com/problems/21dk04/)

代码如下：

```js
```

## 题11 - 剑指 Offer II 098. 路径的数目

[题的力扣地址](https://leetcode-cn.com/problems/2AoeFn/)

代码如下：

```js
```

## 题12 - 剑指 Offer II 099. 最小路径之和

[题的力扣地址](https://leetcode-cn.com/problems/0i0mDW/)

代码如下：

```js
```

## 题13 - 剑指 Offer II 100. 三角形中最小路径之和

[题的力扣地址](https://leetcode-cn.com/problems/IlPe0q/)

代码如下：

```js
```

## 题14 - 剑指 Offer II 101. 分割等和子集

[题的力扣地址](https://leetcode-cn.com/problems/NUPfPr/)

代码如下：

```js
```

## 题15 - 剑指 Offer II 102. 加减的目标值

[题的力扣地址](https://leetcode-cn.com/problems/YaVDxD/)

代码如下：

```js
```

## 题16 - 剑指 Offer II 103. 最少的硬币数目

[题的力扣地址](https://leetcode-cn.com/problems/gaM7Ch/)

代码如下：

```js
```

## 题17 - 剑指 Offer II 104. 排列的数目

[题的力扣地址](https://leetcode-cn.com/problems/D0F0SV/)

代码如下：

```js
```

## 相关阅读
* [《剑指Offer：专项突破版》 - 哈希表部分 JavaScript 题解](https://mp.weixin.qq.com/s/o57JvPCih3YT2cOxvPTSvw)
* [《剑指Offer：专项突破版》 - 链表部分 JavaScript 题解](https://mp.weixin.qq.com/s/IOA1cOa38c4DHcANcQgSKA)
* [《剑指Offer：专项突破版》 - 数组部分 JavaScript 题解](https://mp.weixin.qq.com/s/gU9gDo60IWbuBmoeX4a3gA)
* [《剑指Offer：专项突破版》 - 字符串部分 JavaScript 题解](https://mp.weixin.qq.com/s/aD4sEREM50EF294Mnt7xrw)
* [《剑指Offer：专项突破版》 - 整数部分 JavaScript 题解](https://mp.weixin.qq.com/s/E9wxw1ahtBeCAE_njmIr2Q)