const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;
const payload = JSON.parse(fs.readFileSync("./server-payload.json", "utf8"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.header("Access-Control-Max-Age", "2592000");
  next();
});
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/songs", (req, res) => {
  const songs = payload.songs.map((song) => ({
    id: song.id,
    song: song.song,
  }));
  res.json({ songs });
});

app.get("/song/:id", (req, res) => {
  const artist = payload.songs.find((artist) => artist.id === req.params.id);
  res.json(artist || {});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
