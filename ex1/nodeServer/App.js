const express = require('express');
const app = express();
const http = require('http');
const {exec} = require('child_process');

const options = {
  hostname: 'pythonserver',
  port: 8210,
  //path: '/',
  method: 'GET',
};

let pythonPayload = [];
let nodePayload = [];

app.get('/', (res,req) => {
  formatResponse(req);
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
  req.send(payload);
}

const httpCallout = () => {
  let resolve, reject;
  const promise = new Promise((rs, rj) => { resolve = rs; reject = rj; });
  http.get("http://pythonserver:8210", (res) => {
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