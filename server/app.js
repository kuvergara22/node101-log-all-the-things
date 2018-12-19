const express = require('express');
const fs = require('fs');
const app = express();


fs.writeFile('log.csv', "Agent,Time,Method,Resource,Version,Status", (err) => {
    if (err) throw err;
    // console.log('something went wrong');
  });

  let logallData = [];

  app.use((req, res, next) => {
    // write your logging code here
    var time = new Date();
    var loggin = [];
    var fileObj = {};

    loggin.push(req.headers['user-agent']);
    
    fileObj.Agent = req.headers['user-agent'];
    
    loggin.push(time.toISOString());
    
    fileObj.Time = time.toISOString();
    
    loggin.push(req.method);
    
    fileObj.Method = req.method;
    
    loggin.push(req.originalUrl);
    
    fileObj.Resource = req.originalUrl;
    
    loggin.push("HTTP/" + req.httpVersion);
    
    fileObj.Version = "HTTP/" + req.httpVersion;
    
    loggin.push(res.statusCode);
    
    fileObj.Status = res.statusCode;

    logallData.push(fileObj);
     
    fs.appendFile(__dirname + '/log.csv', loggin, (err) => {
        if (err) throw err;
        
      });
    
      console.log(loggin.toString());

    next();
});

app.get('/', (req, res) => {
// write your code to respond "ok" here
res.send("Ok. Request received.")
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here

res.send(logallData);

});

module.exports = app;