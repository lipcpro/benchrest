var Endpoint = function(ID, url) {
  // Set default properties.
  this.url = url;
  this.ID = ID;
  this.timerStart = null;
  this.timerEnd = null;
  this.requestTime = null;
  this.errorCode = null;
}

Endpoint.prototype.connect = function() {

  var jqXHR = $.ajax({
    context: this,
    url: this.url,

    // We need to use jsonp to allow for cross-domain requests.
    dataType: 'json',

    data: {},
    async: true,

    /**
     * Fire this when the Ajax call is sent to the endpoint.
     */
    beforeSend: function() {
      // Start the timer.
      this.timerStart = Date.now();

    }
  }).done(function(data, textStatus, jqXHR) {
    // Stop the timer.
    this.timerEnd = Date.now();
    // Time spent calling the endpoint in milliseconds.
    this.requestTime = new Date(this.timerEnd - this.timerStart);
    return this.requestTime;
  }).fail(function(jqXHR, textStatus, errorThrown) {
    // Reset the timer...
    this.timerStart = null;
    // ...and throw an error.
    this.fail = true;
    this.errorCode = jqXHR.status;
    return -1;
  })/*.always(function() {
    iteration.updateResult();

    iteration.testComplete = true;
  });
//*/
}

Endpoint.prototype.formatTime = function(time) {
  return time.toISOString().slice(11, -1);
}