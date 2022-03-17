/**
 * + 正右，负左。 右左 撞。其他都不撞。 往右边找到第一个右的。
 * 1. 符号相同的则入栈，不同则出栈，做碰撞。
 * 2. 碰撞的结果，再和第栈的第一个比较，
 *  2.1 如果是异号，则继续碰撞。循环第2步直到栈为空。
 *  2.2 如果是同号，则入栈。符号改成该符号。
 * 3. 往下找下一个
 */
const asteroidCollision = function (asteroids) {
  if (!asteroids) {
    return [];
  }
  asteroids = asteroids.filter((item) => item !== 0);
  if (asteroids.length === 0) {
    return [];
  }
  const stack = [];
  for (let i = 0; i < asteroids.length; i++) {
    const curr = asteroids[i];
    if (stack.length === 0) {
      stack.push(curr);
      continue;
    }

    // 碰撞
    let isBig = false;
    while (stack.length > 0) {
      // debugger
      const last = stack[stack.length - 1];
      // 不碰撞
      if(!(last > 0 && curr < 0)) {
        stack.push(curr);
        break;
      }
      // last > 0 && curr < 0
      if (last > -curr) {
        isBig = false;
        break;
      } else if (last === -curr) {
        // 同归于尽
        isBig = false;
        stack.pop();
        break;
      } else {
        // 继续碰撞
        stack.pop();
        isBig = true;
        continue;
      }
    }

    if(stack.length === 0 && isBig) {
      stack.push(curr);
    }
  }
  return stack;
};

// console.log(asteroidCollision([5,10,-5]))
// console.log(asteroidCollision([8,-8]))
// console.log(asteroidCollision([10,2,-5]))
// console.log(asteroidCollision([-2,-1,1,2]))
// console.log(asteroidCollision([-2,-2,1,-2]))
// console.log(asteroidCollision([1,-2,-2,-2]))
  