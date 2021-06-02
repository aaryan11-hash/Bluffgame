const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);







app.listen(5050,console.log(`app running on port ${5050}`));