const debug = true;

function log(message) {
  if (debug) { 
    console.log(message);
  }
}

var qualtricsURL;
  

	$(document).ready(function() {
    qualtricsURL = $('script[qualtricsURL][qualtricsURL!=null]'). attr('qualtricsURL');
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1);

    parent.postMessage(
      {
        id:		"ready_" + filename,
        currentTime: 	Date.now(),
      },
      qualtricsURL); 
    log("Document Ready Msg: " + filename); 
    
  /*  function disableBack() { 
      window.history.forward(); 
    }
    window.onload = function () {
      parent.postMessage(
        {
          id:		"complete_" & filename,
          currentTime: 	Date.now(),
        },
        qualtricsURL); 
      log("Window OnLoad Msg: " + filename);
      disableBack();
    }
    window.onpageshow = function(evt) { if (evt.persisted) disableBack() } */
});

$(window).on("load",function() {

  qualtricsURL = $('script[qualtricsURL][qualtricsURL!=null]'). attr('qualtricsURL');
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/')+1);

  parent.postMessage(
    {
      id:		"load_" + filename,
      currentTime: 	Date.now(),
    },
    qualtricsURL); 
  log("Window OnLoad Msg: " + filename); 

}) 


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