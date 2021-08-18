<p align="center">
    <img src="resources/blue_butterfly.png" alt="Butterfly" width="100px" />
</p>

# QButterfly
QButterfly is a lightweight approach to embed websites into Qualtrics surveys and observe user behavior. It can be used to track user behavior on single websites or in online experiments (e.g. in controlled usability experiments). 

Qualtrics is used to conveniently manage the overall study flow including consent, random assignment of participants to treatments, manipulation checks, etc. The stimulus website is embedded into Qualtrics via an iframe. Currently, Butterfly can track only user clicks on a stimulus website. Clicks are then stored in a Qualtrics question and can be easily analyzed afterwards. It is therefore not required to manually match a users's survey inputs with other behavioral data (e.g., server logs, analytics tools) after the survey.

A demo of QButterfly is available [here.](https://immzhaw.eu.qualtrics.com/jfe/form/SV_887kj9vYpIqnBfU) 

Please cite as:

Ebert, N., Scheppler, B. 2021. QButterfly: a lightweight approach for webtracking with Qualtrics, doi:10.5281/zenodo.5211544

## Quick start

### Import qbutterfly_template.qsf

Start by [importing](https://www.qualtrics.com/support/survey-platform/survey-module/survey-tools/import-and-export-surveys/) qbutterfly_template.qsf in Qualtrics. 

Your website https://www.mywebsite.com/index.html will be display as an iframe within Qualtrics. Therefore, switch to [survey flow](https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/survey-flow-overview/) and update the following variables:
- windowURL (url of your website, e.g., https://www.mywebsite.com/index.html)
- windowHost (host name of your website, e.g., https://www.mywebsite.com)
- windowBorder (border size of iframe)
- windowHeight (height of iframe)
- windowWidth (width of iframe)
- windowScroll (scrollbars yes or no)

### Embed QButterfly in website

First, deploy your webpage and embed butterfly. For an example see butterfly_example.html in the example folder.

Add JQuery and qbutterfly.js to each html page. qbutterfly.js must be added right before the closing body tag. Afterwards add the class "reactOnClick" to the objects you want to track and give them unique id. The following code will react on a click to the button with the id MyButton. 

```html
<head>
 <title>demo</title>
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>    
</head>
<body>
    <a><div id="MyButton" class="reactOnClick">MyButton</div></a>
    <script type="text/javascript" src="qbutterfly.js"></script>  
</body>
```

After you have embedded QButterfly in all html files open qbutterfly.js. Replace https://immzhaw.eu.qualtrics.com with the name of your own Qualtrics domain that you are using to run surveys.

```javascript
var qualtricsURL = "https://immzhaw.eu.qualtrics.com";
```

### Re-enable the Qualtrics next button after website presentation

When your website is presented via Qualtrics the next button of your survey is hidden by default. If you want to always display the next button, remove the following line of code from the JavaScript of the "Website" question in Qualtrics.

```javascript
this.hideNextButton();
```

To display the next button after it was hidden you have two options.

By default the next button is displayed automatically after 30 seconds. Remove the following line if you want to manually active the next button or change the value 30000ms by any other meaningful duration.

```javascript
setTimeout(function() { jQuery("#NextButton").show(); },30000);
```

You can also activate the next button via a specific user click on your website.

Simply add the class "enableNextButton" behind "reactOnClick" in your html code.

```html
<a><div id="MyButton" class="reactOnClick enableNextButton">MyButton</div></a>
```

### Test the study, run it and analyze the data

Make sure to test your study with multiple browser types / screen resolutions before you run your study. Carefully check the recorded click trails in a soft launch of your study (e.g. 5% of your intended sample). 

QButterfly writes the data to the embedded variable named "collectedData". In Qualtrics you can retrieve it any time via ${e://Field/collectedData}. 

This is an example of the format of the recorded data:

```html
22:11:43:307#Page_Loaded; 22:11:45:266#Start_Button; 22:11:45:281#Page_Loaded; 22:11:46:330#Activity_Activate; 22:11:47:194#Activity_Button; 22:11:47:210#Page_Loaded; 22:11:47:838#Location_Activate; 22:11:48:542#Location_Activate; 22:11:49:358#Location_Button; 22:11:49:376#Page_Loaded; 22:11:50:354#Speech_Activate; 22:11:51:474#Speech_Button; 22:11:51:493#Page_Loaded; 22:11:53:174#Sound_Activate; 22:11:53:990#Sound_Button; 22:11:54:5#Page_Loaded;
```

Each event comes with a timestamp (h:mm:ss:ms) and an event ID (e.g., 16:29:45:643#Page_Loaded). Events are separated via ";". Each website will generate a "Page_Loaded" event when it is loaded in the browser. Each click on an element with the class reactOnClick will generate an event, too (e.g., 16:29:46:471: My_Button). Checkboxes will generate two events with the same ID if pressed twice (e.g., 16:34:41:163#Activity_Activate; 16:34:41:163#Activity_Activate).

To analzye the data, you can, for example, export it from Qualtrics and import it into MS Excel. You can use simple Excel functions to analyze if specific elements have been clicked or to calculate the time between two clicks. Afterwards you can import your analysis results together with other participant data in your statistics package.
