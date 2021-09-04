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
    }
    window.onpageshow = function(evt) { if (evt.persisted) disableBack() }
});

/*$(".reactOnClick").click(function(e) {
  
  log("reactOnClick: " + this.id);
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
}); */

$(document).click(function(e) {
  if (e.target.id) {
    eventText = e.target.id;
  }
  else {
    eventText = e.target.nodename;
  }
  log("Click: " + eventText);
  // Checks if clicked item has class enableNextButton
  var enableNextButton = $(e.target).hasClass('enableNextButton');
  log(enableNextButton);
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