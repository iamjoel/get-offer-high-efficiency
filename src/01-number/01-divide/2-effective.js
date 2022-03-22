/*
 * 除数是否大于除数的2倍，如果是，则继续判断被除数是否大于除数的4倍、8倍等。如果被除数最多大于除数的2k倍，那么将被除数减去除数的2k倍，然后将剩余的被除数重复前面的步骤。
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
    let rest = left;
    while (rest >= right) {
        let res = getMaxTimes(rest, right);
        rest = res.rest;
        times += res.times;
    }
    return sign === 'positive' ? toSafeNum(times) : -times;
};

function getMaxTimes(left, right) {
    let times = 1;
    let prevRight = right;
    right += right;

    while (left >= right) {
        prevRight = right;
        right += right;
        times += times;
    }
    return {
        times,
        rest: left - prevRight,
    };
}

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
