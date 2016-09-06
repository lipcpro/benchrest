var testIteration = function(endpoint, group, iterations) {
  this.endpoint = endpoint;
  this.group = group;
  this.iterations = iterations;
  this.fail = 0;
  this.slowest = [];
  this.fastest = [];
  this.mean;
  this.totalTime;
  this.time;
  this.timerStart = null;
  this.timerEnd = null;
  this.testComplete = false;

  this.timerStart = Date.now();
  for (var i = 1; i <= numIterations; i++) {
    this.time = endpoint.connect(i);
    if(this.time == -1) {
      this.fail++;
    }else if(this.time < this.fastest[time] || this.fastest[time] == 0) {
      this.fastest[time] = time;
      this.fastest[iteration] = i;
    }else if(this.time > this.slowest[time])  {
      this.slowest[time] = this.time;
      this.slowest[iteration] = i;
    }
    /* get each result and determine if it's a new slow, fast, compute mean/average and total time for all iterations*/
  }
  this.timerEnd = Date.now();
  this.totalTime = new Date(this.timerEnd - this.timerStart);
  this.mean = this.totalTime/i;
  this.testComplete = true;
}



testIteration.prototype.formatTime = function(time) {
  return time.toISOString().slice(11, -1);
}
