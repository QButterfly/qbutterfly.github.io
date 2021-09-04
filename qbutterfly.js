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
  
  //tbd: move postMessage to Onload for better timing accuracy
    parent.postMessage(
      {
        id:		filename,
        currentTime: 	Date.now(),
      },
      qualtricsURL); 
    log("Message sent: " + filename);  
    
    function disableBack() { 
      window.history.forward(); 
    }
    window.onload = function () {
      disableBack();
      parent.postMessage(
        {
          id:		"OnLoad",
          currentTime: 	Date.now(),
        },
        qualtricsURL); 
        log("Message sent: OnLoad");  
    }
    window.onpageshow = function(evt) { if (evt.persisted) disableBack() }
});

$(document).click(function(e) {
  if (e.target.id) {
    eventText = e.target.id;
  }
  else {
    eventText = e.target.type;
  }
  log("Click: " + eventText);
  // Checks if clicked item has class enableNextButton
  var enableNextButton = $(e.target).hasClass('enableNextButton');
  log("EnableNext: " + enableNextButton);
  // Send data to the parent window
  
  parent.postMessage(
    {
      id:		eventText,
      currentTime: 	Date.now(),
      enableNextButton: enableNextButton,
    }, 
    qualtricsURL);
  log("Message sent: " + eventText);   
});