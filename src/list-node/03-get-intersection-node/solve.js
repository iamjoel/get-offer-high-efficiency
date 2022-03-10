/*
* 暴力破解。 链表A中，每遍历一个，都去链表B中找。
* 另外一个方案，将链表A的尾部，连到链表B的头部，问题就转换成了找新的链表C的环的入口的问题。改变会链表会报错，如何去复制一个链表。
* 遍历下A和B，存起来。从后往前遍历。
*/
const getIntersectionNode = function (headA, headB) {
    if (!headA || !headB) return null;
    const { stack: stackA, length: lengthA } = toStack(headA);
    const { stack: stackB, length: lengthB } = toStack(headB);
    if (stackA[lengthA - 1] !== stackB[lengthB - 1]) {
      return null;
    }
  
    const minLength = Math.min(lengthA, lengthB);
    for (let i = 1; i <= minLength; i++) {
      if (stackA[lengthA - i] !== stackB[lengthB - i]) {
        const diff = stackA[lengthA - i];
        return diff.next;
      }
    }
  };
  
  function toStack(head) {
    const stack = [];
    let length = 0;
    while (head) {
      stack.push(head);
      head = head.next;
      length++;
    }
    return {
      stack,
      length,
    };
  }
// const getIntersectionNode = function (headA, headB) {
//     let indexA = headA;

//     while (indexA.next) {
//       indexA = indexA.next;
//     }
//     indexA.next = headB;
//     return detectCycle(headA);
//   };
  
// const detectCycle = (head) => {
//     if (!head) {
//       return null;
//     }
//     let slowIndex = head;
//     let fastIndex = head;
//     // 第一遍，探测是否有环。
//     while (fastIndex && fastIndex.next) {
//       slowIndex = slowIndex.next;
//       fastIndex = fastIndex.next.next;
//       if (slowIndex === fastIndex) {
//         break;
//       }
//     }
//     // 没有环
//     if (!fastIndex || !fastIndex.next) {
//       return null;
//     }
//     // 第二遍，算环的长度
//     let circleLen = 0;
//     while (fastIndex && fastIndex.next) {
//       slowIndex = slowIndex.next;
//       fastIndex = fastIndex.next.next;
//       circleLen++;
//       if (slowIndex === fastIndex) {
//         break;
//       }
//     }
  
//     // 第三遍，快指针先走环的长度步，然后慢指针和快指针一起走。相遇的地方，就是环的入口。
//     slowIndex = head;
//     fastIndex = head;
//     for (let i = 0; i < circleLen; i++) {
//       fastIndex = fastIndex.next;
//     }
//     while (slowIndex !== fastIndex) {
//       slowIndex = slowIndex.next;
//       fastIndex = fastIndex.next;
//     }
//     return slowIndex;
//   };
  