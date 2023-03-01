const { io } = require("../index");
const Band = require("../model/band");
const Bands = require("../model/bands");
//Lo busco del index porque en ese archivo lo exporté

const bands = new Bands();

bands.addBand(new Band("Linkin Park"));
bands.addBand(new Band("Nirvana"));
bands.addBand(new Band("Metallica"));
bands.addBand(new Band("System Of A Down"));

console.log(bands);

//Sockets
io.on("connection", (client) => {
  console.log("Connected client");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Disconnected client");
  });

  client.on("message", (payload) => {
    console.log("Message!", payload);

    io.emit("message", { admin: "New message" });
  });

  client.on("emit-message", (payload) => {
    //io.emit("new-message", payload); emite a TODOS
    client.broadcast.emit("new-message", payload); //Emite a todos menos el que lo emitio
  });
});
