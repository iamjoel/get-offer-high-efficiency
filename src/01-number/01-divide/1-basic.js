/*
 * 用减法来实现除法。用被除数减除数，直到被除数小于除数为止。
 */
const divide = function (left, right) {
    if (isError(right)) return;
    if (left === 0) return 0;
    if (right === 1) return toSafeNum(left);
    if (right === -1) return toSafeNum(-left);
    if (Math.abs(left) < Math.abs(right)) return 0;

    const sign = getSign(left, right);
    left = Math.abs(left);
    right = Math.abs(right);

    let times = 0;
    while (left >= right) {
        left -= right;
        times++;
    }
    return sign === 'positive' ? toSafeNum(times) : -times;
};

function isError(right) {
    if (right === 0) {
        throw 'Devider Error!';
    }
}

// 题目要求结果的范围
function toSafeNum(number) {
    const MAX_NUM = Math.pow(2, 31) - 1;
    const MIN_NUM = -Math.pow(2, 31);
    if (number > MAX_NUM) return MAX_NUM;
    if (number < MIN_NUM) return MIN_NUM;
    return number;
}

function getSign(left, right) {
    if (left > 0 && right > 0) {
        return 'positive';
    }
    if (left < 0 && right < 0) {
        return 'positive';
    }
    return 'nagitive';
}