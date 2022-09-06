/**
 * @param {number[]} nums
 * @return {number[][]}
 * 每步：不选当前元素或选择当前元素。
 */
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

// const res = subsets([1,2,3])
// console.log(res)