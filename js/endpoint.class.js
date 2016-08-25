var Endpoint = function(ID, url) {
  // Set default properties.
  this.url = url;
  this.ID = ID;
  this.timerStart = null;
  this.timerEnd = null;
  this.requestTime = null;
  this.fail = null;
  this.errorCode = null;
  this.testComplete = false;
}

Endpoint.prototype.connect = function() {
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
      this.timerStart = Date.now();
      this.appendResult();

      $('#test-btn').addClass('disabled');
    }
  }).done(function(data, textStatus, jqXHR) {
    // Stop the timer.
    this.timerEnd = Date.now();
    // Time spent calling the endpoint in milliseconds.
    this.requestTime = new Date(this.timerEnd - this.timerStart);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    // Reset the timer...
    this.timerStart = null;
    // ...and throw an error.
    this.fail = true;
    this.errorCode = jqXHR.status;

  }).always(function() {
    this.updateResult();

    this.testComplete = true;
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

  $('#test-btn').removeClass('disabled');
}

Endpoint.prototype.formatRequestTime = function() {
  return this.requestTime.toISOString().slice(11, -1);
}