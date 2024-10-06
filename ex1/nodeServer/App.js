const express = require('express');
const app = express();
const http = require('http');

const options = {
  hostname: 'pythonserver',
  port: 8210,
  //path: '/',
  method: 'GET',
};

app.get('/', (res,req) => {
  console.log("HERE");
  let payload;
  http.get("http://pythonserver:8210", (res) => {
    console.log("TEST");
    //console.log(res);
    let data = [];
    res.on('data', (chunk) => {
      console.log(chunk);
      data.push(chunk);
    }).on('error', (err) => {
      console.log("ERROR");
    }).on('end', () => {
      const json = Buffer.concat(data).toString();
      console.log(json);
    });
  })
  console.log("END");
  //req.send();
});
app.listen(8199, () => {
  console.log("Listening");
})

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