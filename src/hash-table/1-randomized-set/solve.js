/**
 * 内部用个对象来实现
 */
 const RandomizedSet = function() {
  this.data = {}
  this.len = 0
};


RandomizedSet.prototype.insert = function(val) {
  if(!this.data[val]) {
    this.data[val] = true
    this.len++
    return true
  }
  return false
};

RandomizedSet.prototype.remove = function(val) {
  if(this.data[val]) {
    delete this.data[val]
    this.len--
    return true
  }
  return false
};

RandomizedSet.prototype.getRandom = function() {
  const randomIndex = Math.floor(Math.random() * this.len)
  return Object.keys(this.data)[randomIndex]
};
