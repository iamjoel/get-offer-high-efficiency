/**
 * 遇到数字则入栈；遇到算符则取出栈顶两个数字进行计算，并将结果压入栈中。
 * 算值用 eval 有问题： 2 - -3 时，会报错。
 */
const evalRPN = function (tokens) {
  var stack = new Stack();
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    const isOperate = ['+', '-', '*', '/'].includes(token);
    if (isOperate) {
      const right = parseInt(stack.pop());
      const left = parseInt(stack.pop());
      let res;
      switch (token) {
        case '+':
          res = left + right;
          break;
        case '-':
          res = left - right;
          break;
        case '*':
          res = left * right;
          break;
        case '/':
          res = left / right;
          break;
      }
      console.log(`${left} ${token} ${right} = ${res}`);
      res = parseInt(res, 10); // 取整
      stack.push(res);
    } else {
      stack.push(token);
    }
  }
  return stack.pop();
};

class Stack {
  constructor() {
    this.data = [];
  }
  push(val) {
    this.data.push(val);
  }
  pop() {
    return this.data.pop();
  }
}


console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]))
// ["4","-2","/","2","-3","-","-"]
// ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
// ["10","6","9", -8,"*","/","*","17","+","5","+"]
// ["10","6", -72,"/","*","17","+","5","+"]
// ["10",0,"*","17","+","5","+"]
// 
// 22
