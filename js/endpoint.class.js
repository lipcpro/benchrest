var Endpoint = function(ID, url) {
  // Set default properties.
  this.url = url;
  this.ID = ID;
  this.timerStart = null;
  this.timerEnd = null;
  this.requestTime = 0;
  this.fail = false;
  this.testComplete = false;
}

Endpoint.prototype.connect = function() {
  var that = this;

  return $.ajax({
    url: that.url,

    // We need to use jsonp to allow for cross-domain requests.
    dataType: 'jsonp',

    data: {},
    async: true,

    /**
     * Fire this when the Ajax call is sent to the endpoint.
     */
    beforeSend: function() {
      // Start the timer.
      that.timerStart = Date.now();
      that.appendResult();

      $('#test-btn').addClass('disabled');
    },

    /**
     * Fire this when the endpoint returns with data.
     */
    success: function( result, status, jqXHR ) {
      // Stop the timer.
      that.timerEnd = Date.now();
      // Time spent calling the endpoint in milliseconds.
      that.requestTime = new Date(that.timerEnd - that.timerStart);
    },

    /**
     * Fire this when the endpoint errors out.
     */
    error: function( jqXHR, status, errorMsg ) {
      // Reset the timer...
      that.timerStart = null;
      // ...and throw an error message.
      that.fail = true;
    },
  }).done(function() {
    that.updateResult();

    that.testComplete = true;
    return that.testComplete;
  });
}

Endpoint.prototype.appendResult = function() {
  $('.results').append('<div id="result-' + this.ID + '"><strong>Endpoint test #' + this.ID +
    ' Status:</strong> <div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 50%"><span class="sr-only">50% Complete (info)</span></div></div>' +
    '<p>Result time: <span class="result-time">Pending</span></p></div>');
}

Endpoint.prototype.updateResult = function() {
  var $result = $('#result-' + this.ID);

  var status = '';
  if (this.fail) {
    status = 'error';
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

  if (typeof this.requestTime == 'object') {
    $result.find('.result-time').text(this.formatRequestTime());
  }

  $result.find('.sr-only').text('100% Complete (' + status + ')');

  $('#test-btn').removeClass('disabled');
}

Endpoint.prototype.formatRequestTime = function() {
  return this.requestTime.toISOString().slice(11, -1);
}