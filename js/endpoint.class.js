var Endpoint = function(url) {
  // Set default properties.
  this.url = url;
  this.timerStart = null;
  this.timerEnd = null;
  this.requestTime = null;
  this.fail = false;
}

Endpoint.prototype.connect = function() {
  var that = this;

  $.ajax({
    url: that.url,

    // We need to use jsonp to allow for cross-domain requests.
    dataType: 'jsonp',

    data: {},
    async: true,

    /**
     * Fire this when the Ajax call is sent to the endpoint.
     */
    ajaxSend: function() {
      // Start the timer.
      that.timerStart = Date.now();
    },

    /**
     * Fire this when the endpoint returns with data.
     */
    success: function( result, status, jqXHR ) {
      // Stop the timer.
      that.timerEnd = Date.now();
      // Time spent calling the endpoint in milliseconds.
      that.requestTime = that.timerEnd - that.timerStart;
    },

    /**
     * Fire this when the endpoint errors out.
     */
    error: function( jqXHR, status, errorMsg ) {
      // Reset the timer...
      that.timerStart = null;
      // ...and throw an error message.
      that.fail = true;
    }
  });
}

Endpoint.prototype.appendResult = function( result ) {

}