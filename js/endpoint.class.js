var Endpoint = function(ID, url) {
  // Set default properties.
  this.url = url;
  this.ID = ID;
  this.iterations = [];
}

Endpoint.prototype.connect = function(i) {
  var iteration = new testIteration(this, i);

  var jqXHR = $.ajax({
    context: this,
    url: this.url,

    // We need to use jsonp to allow for cross-domain requests.
    dataType: 'jsonp',

    data: {},
    async: true,

    /**
     * Fire this when the Ajax call is sent to the endpoint.
     */
    beforeSend: function() {
      // Start the timer.
      iteration.timerStart = Date.now();
      iteration.appendResult();

      $('#test-btn').addClass('disabled');
    }
  }).done(function(data, textStatus, jqXHR) {
    // Stop the timer.
    iteration.timerEnd = Date.now();
    // Time spent calling the endpoint in milliseconds.
    iteration.requestTime = new Date(iteration.timerEnd - iteration.timerStart);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    // Reset the timer...
    iteration.timerStart = null;
    // ...and throw an error.
    iteration.fail = true;
    iteration.errorCode = jqXHR.status;

  }).always(function() {
    iteration.updateResult();

    iteration.testComplete = true;
  });

  this.iterations[i] = iteration;
}