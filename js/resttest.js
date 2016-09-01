(function($) {

  $(':input:enabled:visible:first').focus();

  var endpoints = [];
  var slowest   = [];
  var fastest   = [];
  var mean      = [];
  var total     = [];

  // Start the tests when the button is clicked.
  $('#test-btn').on('click', function(e) {

    // [TODO] - Add JS validation here before resuming with tests.
    if( !$("#base-url").val()) {
      alert('Please enter the server\'s url');
      $('#base-url').focus();
      return;
    }
    if(!$('#test-reps').val()) {
      alert('Please enter the number of tests to be run');
      $('#test-reps').focus();
      return;
    }
    if(!$('#endpoint1').val()) {
      alert('Please enter the first endpoint\'s relative url');
      $('#endpoint1').focus();
      return;
    }
    if(!$('#endpoint2').val()) {
      alert('Please enter the second endpoint\'s relative url');
      $('#endpoint2').focus();
      return;
    }
    $('#test-btn').addClass('disabled');

    // Get all of the endpoints.
    fillEndpointsArray();

    var numIterations = $('#test-reps').val();

    // Start the test sequence.
    testIteration(endpoint[0], 'endpoint1', numIterations);
    testIteration(endpoint[1], 'endpoint2', numIterations);
  });

  function fillEndpointsArray() {
    var server = $('#base-url').val();

    // For each textbox with class of endpoint-input, grab the value and create a new endpoint.
    var i = 1;
    $('.endpoint-input').each(function(e) {
      var url = server + '/' + $(this).val();

      var newEndpoint = new Endpoint(i, url);
      // Change endpoint properties here, if necessary.
      endpoints.push(newEndpoint);

      i++;
    });

    return endpoints;
  }

})(jQuery);

/*
psuedocode
on button click/press
disable button
get values of each field
add each endpoint to url for each ajax call variable
start total timer
start loop
start iteration timer
make ajax call and check response for 200
stop iteration timer
check to see if it's new short or long and save
end loop
stop total timer
 repeat for second endpoint
end tests
print results

results should include slowest fastest mean/average total time for x iterations
*/
