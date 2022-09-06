# 《剑指Offer：专项突破版》 - 回溯法部分 JavaScript 题解
《剑指Offer：专项突破版》是一个算法题集。该题单包含了程序员在准备面试过程中必备的数据结构与算法知识。具体包含：
- 数据结构：整数、数组、字符串、链表、栈、栈、队列、树、堆和前缀树。
- 算法：二分查找、排序、回溯法、动态规划和图搜索。 

本文来分享下回溯法部分题的解法~

## 回溯法介绍

## 题1 - 剑指 Offer II 079. 所有子集

[题的力扣地址](https://leetcode-cn.com/problems/TVdhkn/)。

每步都是：不选当前元素或选择当前元素。直到最后一步，则完全结束。

代码如下：

```js
const subsets = function(nums) {
    if(nums.length === 0) {
        return [[]]
    }
    const res = []
    gen(nums, 0, [], res)
    return res
};

const gen = function(nums, index, prevRes, res) {
    if(index === nums.length) {
        res.push(prevRes)
        return
    }
    // 不选当前元素
    gen(nums, index + 1, [...prevRes], res)
    // 选择当前元素
    prevRes.push(nums[index])
    gen(nums, index + 1, [...prevRes], res)
}
```

## 题2 - 剑指 Offer II 080. 含有 k 个元素的组合

[题的力扣地址](https://leetcode-cn.com/problems/uUsW3B/)

代码如下：

```js
```

## 题3 - 剑指 Offer II 081. 允许重复选择元素的组合

[题的力扣地址](https://leetcode-cn.com/problems/Ygoe9J/)

代码如下：

```js
```

## 题4 - 剑指 Offer II 082. 含有重复元素集合的组合

[题的力扣地址](https://leetcode-cn.com/problems/4sjJUc/)

代码如下：

```js
```

## 题5 - 剑指 Offer II 083. 没有重复元素集合的全排列

[题的力扣地址](https://leetcode-cn.com/problems/VvJkup/)

代码如下：

```js
```

## 题6 - 剑指 Offer II 084. 含有重复元素集合的全排列

[题的力扣地址](https://leetcode-cn.com/problems/7p8L0Z/)

代码如下：

```js
```

## 题7 - 剑指 Offer II 085. 生成匹配的括号

[题的力扣地址](https://leetcode-cn.com/problems/IDBivT/)

代码如下：

```js
```

## 题8 - 剑指 Offer II 086. 分割回文子字符串

[题的力扣地址](https://leetcode-cn.com/problems/M99OJA/)

代码如下：

```js
```

## 题9 - 剑指 Offer II 087. 复原 IP

[题的力扣地址](https://leetcode-cn.com/problems/0on3uN/)

代码如下：

```js
```

## 相关阅读
* [《剑指Offer：专项突破版》 - 哈希表部分 JavaScript 题解](https://mp.weixin.qq.com/s/o57JvPCih3YT2cOxvPTSvw)
* [《剑指Offer：专项突破版》 - 链表部分 JavaScript 题解](https://mp.weixin.qq.com/s/IOA1cOa38c4DHcANcQgSKA)
* [《剑指Offer：专项突破版》 - 数组部分 JavaScript 题解](https://mp.weixin.qq.com/s/gU9gDo60IWbuBmoeX4a3gA)
* [《剑指Offer：专项突破版》 - 字符串部分 JavaScript 题解](https://mp.weixin.qq.com/s/aD4sEREM50EF294Mnt7xrw)
* [《剑指Offer：专项突破版》 - 整数部分 JavaScript 题解](https://mp.weixin.qq.com/s/E9wxw1ahtBeCAE_njmIr2Q)