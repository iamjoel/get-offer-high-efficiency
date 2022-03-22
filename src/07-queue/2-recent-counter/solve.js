const PERIOD = 3000;
const RecentCounter = function () {
  this.list = [];
};

RecentCounter.prototype.ping = function (t) {
  while (t - this.list[0] > PERIOD) {
    this.dequeue();
  }
  this.enqueue(t);
  return this.list.length;
};

RecentCounter.prototype.enqueue = function (t) {
  this.list.push(t);
};

RecentCounter.prototype.dequeue = function () {
  return this.list.shift();
};
