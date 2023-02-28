const express = require("express");
const path = require("path");
require("dotenv").config();

//Express App
const app = express();

//Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

const {PORT} = process.env;

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

server.listen(PORT, (error) => {
  if (error) throw new Error(error);

  console.log("Server running in port ", PORT);
});
