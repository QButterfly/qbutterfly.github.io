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
- iframe_url (url of your website, e.g., https://www.mywebsite.com/index.html)
- iframe_host (host name of your website, e.g., https://www.mywebsite.com)
- iframe_border (border size of iframe)
- iframe_height (height of iframe)
- iframe_width (width of iframe)
- iframe_scroll (scrollbars yes or no)

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

### Enable the Qualtrics next button

When your website is presented via Qualtrics the next button of your survey is hidden by default. If you want to always display the next button, remove the following line of code from the JavaScript of the "Website" question in Qualtrics.

```javascript
this.hideNextButton();
```

To display the next button after it was hidden you have two options.

By default the next button is displayed automatically after 30 seconds. Remove the following line if you want to manually active the next button or change the value 30000ms by any other meaningful duration.

```javascript
setTimeout(function() { jQuery("#NextButton").show(); },30000);
```

You can also active the next button via a specific user click on your website.

Simply add the class "enableNextButton" behind "reactOnClick" in your html code.

```html
<a><div id="MyButton" class="reactOnClick enableNextButton">MyButton</div></a>
```

### Test the study, run it and analyze the data

Make sure to test your study with multiple browser types / screen resolutions before you run your study. Carefully check the recorded click trails in a soft launch of your study (e.g. 5% of your intended sample). 

QButterfly writes the data to the embedded variable named "collectedData". In Qualtrics you can retrieve it any time via ${e://Field/collectedData}. 

This is an example of the format of the recorded data:

```html
16:29:45:643: Load;16:29:46:471: Start_Button;16:29:46:598: Load;16:29:46:790: Activity_Button;16:29:46:909: Load;16:29:47:77: Location_Button;16:29:47:223: Load;16:29:47:398: Speech_Button;16:29:47:522: Load;16:29:48:174: Sound_Activate;16:29:48:174: Sound_Activate;16:29:48:949: Sound_Button;16:29:49:83: Load;
```

Each event comes with a timestamp (h:mm:ss:ms) and the event ID (e.g., 16:29:45:643: Load). Events are separated via ";". Each website will generate a "Load" event when is loaded in the browser. Each click to an element with the class reactOnClick will generate an event, too (e.g., 16:29:46:471: Start_Button). Checkboxes will generate two events with the same ID if pressed twice (e.g., 16:34:41:163: Activity_Activate;16:34:41:163: Activity_Activate).

To analzye the data, you can for example export it from Qualtrics and import it in MS Excel. You can use simple Excel functions to analyze if specific elements have been clicked or to calculate the time between two clicks. Afterwards you can import your analysis results together with other participant data in your statistics package.
