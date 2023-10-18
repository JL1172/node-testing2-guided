const express = require("express");

const Hobbits = require("./hobbits/hobbits-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/hobbits/:id", async(req, res) => {
    try {
        const result = await Hobbits.getById(req.params.id);
        res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err)
    }
});

server.post("/hobbits", async(req, res) => {
  try {
    const result = await Hobbits.insert(req.body);
    res.status(201).json(result); 
  } catch (err) {
    res.status(500).json(err)
  }
});

server.delete("/hobbits/:id", async(req, res) => {
  try {
    const result = await Hobbits.remove(req.params.id);
    res.status(200).json(result); 
  } catch (err) {
    res.status(500).json(err)
  }
});

server.put("/hobbits/:id", async(req, res) => {
    try {
      const updated = await Hobbits.update(req.params.id,req.body);
      res.status(200).json(updated)
    } catch (err) { 
      res.status(500).json(err)
    }
});

module.exports = server;
