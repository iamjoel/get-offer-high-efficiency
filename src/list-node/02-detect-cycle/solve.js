/*
 * 快慢两个指针。快指针一次走2步，慢指针一次走1步。
 * 如果有环，快指针一定会追上慢指针。追上后，再走一圈，指针间的差值，就是圈的长度。
 * 重头走，快指针先走一圈的长度，然后快慢指针一起走。相遇的地方，就是环的入口。
*/
const detectCycle = (head) => {
  if (!head) {
    return null;
  }
  let slowIndex = head;
  let fastIndex = head;
  // 第一遍，探测是否有环。
  while (fastIndex && fastIndex.next) {
    slowIndex = slowIndex.next;
    fastIndex = fastIndex.next.next;
    if (slowIndex === fastIndex) {
      break;
    }
  }
  // 没有环
  if (!fastIndex || !fastIndex.next) {
    return null;
  }
  // 第二遍，算环的长度
  let circleLen = 0;
  while (fastIndex && fastIndex.next) {
    slowIndex = slowIndex.next;
    fastIndex = fastIndex.next.next;
    circleLen++;
    if (slowIndex === fastIndex) {
      break;
    }
  }

  // 第三遍，快指针先走环的长度步，然后慢指针和快指针一起走。相遇的地方，就是环的入口。
  slowIndex = head;
  fastIndex = head;
  for (let i = 0; i < circleLen; i++) {
    fastIndex = fastIndex.next;
  }
  while (slowIndex !== fastIndex) {
    slowIndex = slowIndex.next;
    fastIndex = fastIndex.next;
  }
  return slowIndex;
};