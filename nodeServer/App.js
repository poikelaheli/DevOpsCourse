const express = require('express');
const app = express();
const http = require('http');
const {exec} = require('child_process');
const path = require('path');
const fs = require('fs');

let state = "INIT";

let htmlPage = " <!DOCTYPE html>" +
"<html>" +
"<head></head>" +
"<body>" +
    "<script type = \"text/javascript\" src=\"App.js\"></script>" +
    "<div>" +
        "<button onclick=\"handleRequest()\">Request</button>" +
        "<button>Stop</button>" +
        "<textarea id=\"response\">{value}</textarea>" +
    "</div>" +
"</body>" +
"</html>";

const options = {
  hostname: 'pythonserver1',
  port: 8210,
  //path: '/',
  method: 'GET',
};

let pythonPayload = [];
let nodePayload = [];

app.use(express.static('public')); 

app.get('/', (res,req) => {
  req.sendFile(path.join(__dirname, '../', 'page.html'));
  console.log(path.join(__dirname, '../', 'page.html'));
  //formatResponse(req);
});

app.get('/request', (res,req) => {
  formatResponse(req);
});

app.get('/state', (res,req) => {
  req.send(state);
});

app.listen(8199, () => {
  console.log("Listening");
})

const formatResponse = async(req) => {
  try {
    console.log("HERE");
    await httpCallout();
    await runBashComand("hostname -I");
    await runBashComand("ps -ax");
    await runBashComand("df");
    await runBashComand("last reboot | head -1");
    await sendResponse(req);
    //req.send();
  }
  catch (err) {
    console.log(err);
  }
}

const sendResponse = (req) => {
  payload = "Service \n";
  for (const item of (nodePayload)) {
    payload += "\n" + item;
  }
  payload += "\nService2 \n";
  for (const item of (pythonPayload)) {
    payload += "\n" + item;
  }
  //htmlPage.replace('{value}', payload);
  //req.write(htmlPage);
  //req.end();
  req.send(payload);
}

const httpCallout = () => {
  let resolve, reject;
  const promise = new Promise((rs, rj) => { resolve = rs; reject = rj; });
  http.get("http://pythonserver1:8210", (res) => {
    console.log("TEST");
    //console.log(res);
    let data = [];
    res.on('data', (chunk) => {
      data.push(chunk);
    }).on('error', (err) => {
      console.log("ERROR");
      reject(err);
    }).on('end', () => {
      const json = Buffer.concat(data).toString();
      pythonPayload = json.split(";");
      console.log(pythonPayload);
      resolve();
    });
    return promise;
  })
}

const runBashComand = (command) => {
  let resolve, reject;
  const promise = new Promise((rs, rj) => { resolve = rs; reject = rj; });
  exec(command, (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      console.error(err)
      reject(err);
    } else {
    // the *entire* stdout and stderr (buffered)
    nodePayload.push(stdout);
    console.log(nodePayload);
    resolve();
    }
  })
  return promise;
}

/*
  nodeserver:
    command: npm start
    build:
      dockerfile: DockerFile
      context: ./nodeServer
    ports:
      - "8199:8199"
    expose:
      - 8199
      */