const express = require("express");
const bodyParser = require("body-parser");
var request = require('request');
const restService = express();
var jsforce = require('jsforce');
var port = process.env.port || 3000;
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());


restService.post("/getReports", function (req, res) {
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.Name ?
    req.body.queryResult.parameters.Name :
    "Seems like some problem. Speak again.";
  var access_token = '';
    
var conn = new jsforce.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl : 'https://test.salesforce.com'
});
conn.login('marimuthu.s@cardinality.ai.prvqa2', 'Thisaimugam5#', function(err, res) {
  if (err) { return console.error(err); }
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  
});
speech = JSON.stringify(conn.accessToken);
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

return res.json({
  payload: speechResponse,
  //data: speechResponse,
  fulfillmentText: speech,
  speech: speech,
  displayText: speech,
  source: "webhook-echo-sample"
});
 


});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});

//Body parser

