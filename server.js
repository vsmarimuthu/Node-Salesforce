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


restService.post("/createQuote", function (req, mainres) {	
  var speech ='';;
  var access_token = '';
    try{
var conn = new jsforce.Connection({
  loginUrl : config.salesforceLoginURL
});
console.log('req :>> ', JSON.stringify(req));
conn.login(config.salesforceUserName, config.salesforcePassword+config.salesforceSecurityToken, function(err, userInfo) {
	console.log(conn.accessToken);

conn.apex.post("/createteslaquote/",JSON.stringify(req), function(res,respo) {
  console.log(respo);
 

      return mainres.json({
        payload: conn.accessToken
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

