(function($) {

  $(':input:enabled:visible:first').focus();

  var endpoints = [];

  // Start the tests when the button is clicked.
  $('#test-btn').on('click', function(e) {

    // [TODO] - Add JS validation here before resuming with tests. If validation fails:
    // return false;

    // Get all of the endpoints.
    fillEndpointsArray();

    // Start the test sequence.
    for (var i = 0; i < endpoints.length; i++) {
      endpoints[i].connect();
    }
  });

  function fillEndpointsArray() {
    var server = $('#base-url').val();

    // For each textbox with class of endpoint-input, grab the value and create a new endpoint.
    var i = 1;
    $('.endpoint-input').each(function(e) {
      var url = server + '/' + $(this).val();

      var newEndpoint = new Endpoint(url, i);
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
*/
