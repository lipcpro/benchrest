var counter1 = 0;
var counter2 = 0;
var fail1 = 0;
var fail2 = 0;

$('#test-btn').click(function() {
  //$(this).toggle();
  var server = $("#base-url").val;
  alert(server);
  });



// this has to be included in the button function somehow
$.ajax({
  url: $( "#base_url" ).val,
  data: {
  },
  success: function( result ) {
    //stop the timer and record the time
    $( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
  }else{
    //stop the timer and increment the fail counter
  }
});

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
