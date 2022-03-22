const MovingAverage = function (size) {
  this.queue = new MyQueue();
  this.size = size;
  this.sum = 0;
};

MovingAverage.prototype.next = function (val) {
  if (this.queue.size === this.size) {
    this.sum -= this.queue.dequeue();
  }
  this.sum += val;
  this.queue.enqueue(val);
  const average = this.sum / this.queue.size;
  return average;
};

class MyQueue {
  constructor() {
    this.list = [];
    this.size = 0;
  }
  enqueue(item) {
    this.size++;
    this.list.push(item);
  }

  dequeue() {
    this.size--;
    return this.list.shift();
  }
}
