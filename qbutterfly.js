const debug = true;

function log(message) {
  if (debug) { 
    console.log(message);
  }
}

var qualtricsURL;
  
 // disable for going back in Browser
	$(document).ready(function() {
    log("Ready");  
    qualtricsURL = $('script[qualtricsURL][qualtricsURL!=null]'). attr('qualtricsURL');
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);
   
    function disableBack() { 
      window.history.forward(); 
    }
    
    window.onload = function () {
      parent.postMessage(
        {
          id:		filename,
          currentTime: 	Date.now(),
        },
        qualtricsURL); 
      log("Message sent: " + filename);  
      disableBack();
    }
    window.onpageshow = function(evt) { if (evt.persisted) disableBack() }
});

// init a variable for saving the last id (because of checkbox firing two times)
var lastIdSubmitted;

$(".reactOnClick").click(function(e) {
  
  log("reactOnClick");
  // check if reactOnClick for the second time on same element (because of checkbox firing two times)
  if(typeof lastIdSubmitted === 'undefined' || lastIdSubmitted !== this.id){
  // Get current date
  // Checks if clicked item has class enableNextButton
  var enableNextButton = this.className.indexOf("enableNextButton") >= 0;
  log(enableNextButton);
  // Send data to the parent window
  parent.postMessage(
    {
      id:		this.id,
      currentTime: 	Date.now(),
      enableNextButton: enableNextButton,
    }, 
    qualtricsURL);
  log("Message sent: " + this.id);  
  // save the actual id (because of checkbox firing two times)
  lastIdSubmitted = this.id;
  } else {
  // set the last id to some dummy value (because of checkbox firing two times, but when user activates it again, this should be reported)
   lastIdSubmitted = "dummyId";
  }
});