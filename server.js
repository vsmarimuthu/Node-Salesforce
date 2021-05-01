const express = require("express");
const bodyParser = require("body-parser");
var request = require('request');
const restService = express();
var jsforce1 = require('jsforce');
var jsforce = require('node-salesforce');
var port = process.env.port || 3000;
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());


restService.post("/getReports", function (req, res) {
	console.log('I came here');
  var speech ='';;
  var access_token = '';
    try{
var conn = new jsforce.Connection({
	//oauth2 : {
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl : 'https://test.salesforce.com',
   //clientId : '3MVG9N6eDmZRVJOlOiQKbAJuqgE348vvvD0qPKb2Uct9OkEfOCq8HIEUFB7vWGnELmmxqJqKa8cTZITu7El8I',
   // clientSecret : '1B2C540127B7E1F64F19CBF2C443B73549DDF12498B29785D9D417947F8922F3',
   // redirectUri : 'https://test.salesforce.com'
	//}
});
var _request = {
  url: '/services/data/v45.0/limits/recordCount?sObjects=Account,User',
  method: 'get',
  body: '',
  headers : {
          "Content-Type" : "application/json"
      }
};

conn.login('marimuthu.s@cardinality.ai.prvpod', 'Thisaimugam5ya2qy1F3Gzp2KJp3JgHNtoQy', function(err, userInfo) {
	console.log(conn.accessToken);
  var body = { title: 'hello', num : 1 };
conn.apex.post("/showreport/", body, function(res,respo) {
  console.log(respo);
  // the response object structure depends on the definition of apex class
});
 
});
	}
	catch(error){
		console.log(error);
	}

 


});

restService.listen(process.env.PORT || 5000, function () {
  console.log("Server up and listening on port ",port );
});

//Body parser

