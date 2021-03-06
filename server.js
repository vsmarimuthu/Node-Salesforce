const express = require("express");
const bodyParser = require("body-parser");
const config = require('./config.json');
var jsforce = require('node-salesforce');
const restService = express();


restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());


restService.post("/getReports", function (req, mainres) {	
  var speech ='';;
  var access_token = '';
    try{
var conn = new jsforce.Connection({
  loginUrl : config.salesforceLoginURL
});
console.log('req :>> ', JSON.stringify(req.body.queryResult.parameters));
conn.login(config.salesforceUserName, config.salesforcePassword+config.salesforceSecurityToken, function(err, userInfo) {
	console.log(conn.accessToken);
 
  let _filter={column: req.body.queryResult.parameters.filterField,
    value: req.body.queryResult.parameters.filterValue.toUTCString(),
    operator: req.body.queryResult.parameters.filteroperator};
    console.log('_filter :>> ', JSON.stringify(_filter));
  var body = { Name: req.body.queryResult.parameters.reportName,
              Filter : _filter
              };
              console.log('_filter :>> ', JSON.stringify(_filter));
conn.apex.post("/showreport/",JSON.stringify(body), function(res,respo) {
  console.log(respo);
  speech = '<speak><break strength="x-strong"/> Congratulations. <break time=".5s"/>'+respo+' <say-as interpret-as="cardinal">' + speech + '</say-as></speak>';
       var speechResponse = {
        google: {
         expectUserResponse: true,
           richResponse: {
           items: [{
            simpleResponse: {
                          textToSpeech: speech
                                          }
                                  }]
                              }
                            }
                          };

      return mainres.json({
        payload: speechResponse,
        //data: speechResponse,
        fulfillmentText: speech,
        speech: speech,
        displayText: speech,
        source: "Reports"
    });
  // the response object structure depends on the definition of apex class
});
 
});
	}
	catch(error){
		console.log(error);
	}

 


});

restService.listen(process.env.PORT || 5000, function () {
  console.log("Server up and listening on port");
});

//Body parser

