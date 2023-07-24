const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const moveSchema = new mongoose.Schema({
    boardSize: Number,
    position: Number,
    value: String,
    winner: String,
});

const Move = mongoose.model('Move', moveSchema);

app.use(cors());
app.use(express.json());

app.post('/move', async (req, res) => {
  try {
    const { position, value, winner, boardSize } = req.body;
    const move = new Move({ position, value, winner, boardSize });
    await move.save();
    res.status(201).send(move);
  } catch (error) {
    res.status(400).send(error);
  }
});

  
  app.get('/moves', async (req, res) => {
    try {
      const moves = await Move.find({});
      res.send(moves);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  app.delete('/moves', async (req, res) => {
    try {
      await Move.deleteMany({});
      res.send({ message: "All moves deleted." });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  
