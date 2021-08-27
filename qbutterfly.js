var qualtricsURL;
  
 // disable for going back in Browser
	$(document).ready(function() {
    var timestamp = Date.now();
    qualtricsURL = $('script[qualtricsURL][qualtricsURL!=null]'). attr('qualtricsURL');
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);
   
    function disableBack() { window.history.forward() }

    window.onload = disableBack();
    window.onpageshow = function(evt) { if (evt.persisted) disableBack() }
   
    // Send data to the parent window
    parent.postMessage(
      {
        id:		filename,
        currentTime: 	timestamp,
      },
      qualtricsURL);

});

// init a variable for saving the last id (because of checkbox firing two times)
var lastIdSubmitted;

$(".reactOnClick").click(function(e) {
// check if reactOnClick for the second time on same element (because of checkbox firing two times)
if(typeof lastIdSubmitted === 'undefined' || lastIdSubmitted !== this.id){
  // Get current date
  var timestamp = Date.now();
  
  // Checks if clicked item has class enableNextButton
  var enableNextButton = this.className.indexOf("enableNextButton") >= 0;
  
  // Send data to the parent window
  parent.postMessage(
    {
      id:		this.id,
      currentTime: 	timestamp,
      enableNextButton: enableNextButton,
    },
    qualtricsURL);
  
  // save the actual id (because of checkbox firing two times)
  lastIdSubmitted = this.id;
} else {
  // set the last id to some dummy value (because of checkbox firing two times, but when user activates it again, this should be reported)
   lastIdSubmitted = "dummyId";
}
});