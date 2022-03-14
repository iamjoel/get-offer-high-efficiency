/**
 * times: 缓存的次数。访问少的在前面。每次被访问的，放后面。会超时。
 */
const LRUCache = function (capacity) {
  this.capacity = capacity;
  this.len = 0;
  this.obj = {};
  this.times = [];
};

LRUCache.prototype.get = function (key) {
  if (this.obj[key] === undefined) {
    return -1;
  }
  this.updateTimes(key);
  return this.obj[key];
};

LRUCache.prototype.put = function (key, value) {
  // 新增
  if (this.obj[key] === undefined) {
    if (this.capacity === this.len) {
      let removeItem = this.times.shift();
      delete this.obj[removeItem];
      this.len--;
    }
    this.obj[key] = value;
    this.times.push(key);
    this.len++;
  } else {
    // 更新
    this.obj[key] = value;
    this.updateTimes(key);
  }
};

// 更新缓存的次序。
LRUCache.prototype.updateTimes = function (key) {
  this.times = this.times.filter((k) => k !== key);
  this.times.push(key);
};



