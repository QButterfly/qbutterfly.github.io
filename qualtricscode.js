Qualtrics.SurveyEngine.addOnload(function (){
    //hides the next button on the page

	this.hideNextButton();
	
	setTimeout(function() { jQuery("#NextButton").show(); },30000);
	
	// stores the actual this in variable for later use in callback-function, where this is the Window instead of S.r
	var surveyEngineVar = this;
	
	// overrides CSS (padding-top)
	jQuery(".Skin .SkinInner").attr("style", "padding: 0 !important");
	jQuery(".Skin .QuestionOuter").attr("style", "padding-bottom: 0 !important");
	jQuery(".Skin .QuestionText").attr("style", "padding-top: 0");
	
	// initialize the collectable data
	var collectedData = "";

	// register callback handleMessage, when a message from the iFrame is received
	if (window.addEventListener) {
		window.addEventListener("message", handleMessage);
		console.log("addEventListener");
	} else {
		window.attachEvent("onmessage", handleMessage);
		console.log("attachEvent");
	}

	// Callback-Function for the iFrame-message
	function handleMessage(event) {
		console.log("handleMessage");
		if (event.origin != "${e://Field/iframe_host}") {
			console.log("The message came from some site we don't know. We're not processing it.");
			return;
		}

		var dataFromChildIframe = event.data;

		// Add the current Time and the id to the collectedData-String 
		collectedData += dataFromChildIframe.currentTime + ": " + dataFromChildIframe.id + ";";
		
		// Write the collectedData-String to an embedded field
		Qualtrics.SurveyEngine.setEmbeddedData("collectedData", collectedData);

		// Shows the next button, if user clicked on an element with class enableNextButton
		if(dataFromChildIframe.enableNextButton){
		surveyEngineVar.showNextButton();
		}
	}
});