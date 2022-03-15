/**
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
  asteroids = asteroids.filter(item => item !== 0);
  if (asteroids.length === 0) {
    return [];
  }
  const stack = [asteroids[0]];
  let currSign = asteroids[0] > 0 ? 1 : -1;
  // debugger
  for (let i = 1; i < asteroids.length; i++) {
    const curr = asteroids[i];
    if(stack.length === 0) {
      currSign = curr > 0 ? 1 : -1
      stack.push(curr);
      continue;
    }
    if (curr * currSign > 0) {
      // 同号
      stack.push(curr);
    } else {
      // 异号。碰撞
      let isBigger = false;
      while (stack.length > 0) {
        const top = stack[0];
        if (Math.abs(top) > Math.abs(curr)) {
          // 栈里的都是同号的
          isBigger = false;
          break;
        } else if (Math.abs(top) === Math.abs(curr)) {
          // 同归于尽
          isBigger = false;
          stack.pop();
          break;
        } else {
          // 继续碰撞
          isBigger = true;
          stack.pop();
          continue;
        }
      }
      // 把栈里的都撞光了。
      if (isBigger && stack.length === 0) {
        stack.push(curr);
        currSign = -currSign;
      }
    }
  }
  return stack;
};

asteroidCollision([5,10,-5])
  