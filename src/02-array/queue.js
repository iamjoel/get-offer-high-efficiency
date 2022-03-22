const defaultOptions = {
  interval: 1000,
  onFinish() {}
}
class Queue {
  constructor(options = {}) {
    this.options = {...defaultOptions, ...options}
  }
  taskList = []
  options = {}
  add(task) {
    this.taskList.push(task)
  }
  setTaskList (taskList) {
    this.taskList = taskList
  }
  start() {
    this.exec(true)
  }
  delay() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, this.options.interval )
    })
  }
  async exec(notDelay) {
    const list = this.taskList
    if(list.length === 0) {
      this.options.onFinish()
      return
    }
    if(!notDelay) {
      await this.delay()
    }
    const task = this.taskList.shift();
    task();
    await this.exec()
  }
}