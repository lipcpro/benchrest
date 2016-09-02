var testIteration = function(endpoint, group, iterations) {
  this.endpoint = endpoint;
  this.group = group;
  this.iterations = iterations;
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
    if(this.time < this.fastest[time] || this.fastest[time] == 0) {
      this.fastest[time] = time;
      this.fastest[iteration] = i;
    }
    if(this.time > this.slowest[time])  {
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

testIteration.prototype.appendResult = function() {
  if (this.endpoint.ID === 1) {
    $('.results').append('<div id="group-' + this.group + '"><h4>Iteration Group #' + this.group + '</h4></div>');
  }
  $('#group-' + this.group).append('<div id="group-' + this.group + '--result-' + this.endpoint.ID + '"><strong>Endpoint test #' + this.endpoint.ID +
    ' Status:</strong> <div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%"><span class="sr-only">50% Complete (info)</span></div></div>' +
    '<p>Result time: <span class="result-time">Pending</span></p></div>');
}

testIteration.prototype.updateResult = function() {
  var $result = $('#group-' + this.group + '--result-' + this.endpoint.ID);

  var status = '';
  if (this.fail) {
    status = 'danger';
  } else {
    status = 'success';
  }

  $result.find('.progress-bar')
    .removeClass('progress-bar-info')
    .removeClass('progress-bar-striped')
    .removeClass('active')
    .attr('aria-valuenow', 100)
    .css('width', '100%')
    .addClass('progress-bar-' + status);

  if (!this.fail) {
    $result.find('.result-time').text(this.formatRequestTime());
  } else {
    $result.find('.result-time').text('Error ' + this.errorCode);
  }

  $result.find('.sr-only').text('100% Complete (' + status + ')');

}