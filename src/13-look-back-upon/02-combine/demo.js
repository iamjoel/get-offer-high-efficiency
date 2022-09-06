/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 * 每步：不选当前元素或选择当前元素。
 */
const combine = function(n, k) {
    const nums = []
    for(let i = 1; i <= n; i++) {
        nums.push(i)
    }
    const res = []
    gen(nums, k, 0, [], res)
    return res
};

const gen = function(nums, k, index, prevRes, res) {
    if (index > nums.length) {
        return
    }
    if(k === prevRes.length) {
        res.push(prevRes)
        return
    }
    // 不选当前元素
    gen(nums, k, index + 1, [...prevRes], res)
    // 选择当前元素
    prevRes.push(nums[index])
    gen(nums, k, index + 1, [...prevRes], res)
}

const res = combine(4, 2)
console.log(res)