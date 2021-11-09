const Game = require("../models/game.model.js");
// Create and Save a new Game
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Game
  const game = new Game({
    date: req.body.date,
    status: req.body.status,
  });

  // Save Game in the database
  Game.create(game, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Game.",
      });
    else res.send(data);
  });
};

// Retrieve all Games from the database.
exports.findAll = (req, res) => {
  Game.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving games.",
      });
    else res.send(data);
  });
};

// Find a single Game with a gameId
exports.findByID = (req, res) => {
  Game.findById(req.params.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Game with id ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Game with id " + req.params.gameId,
        });
      }
    } else res.send(data);
  });
};

// Find a single Game with a date
exports.findByDate = (req, res) => {
  Game.findByDate(req.params.date, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Game with date ${req.params.date}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Game with date " + req.params.date,
        });
      }
    } else res.send(data);
  });
};

// Update a Game identified by the gameId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Game.updateById(req.params.gameId, new Game(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Game with id ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Game with id " + req.params.gameId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Game with the specified gameId in the request
exports.delete = (req, res) => {
  Game.remove(req.params.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Game with id ${req.params.gameId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Game with id " + req.params.gameId,
        });
      }
    } else res.send({ message: `Game was deleted successfully!` });
  });
};

// Delete all Games from the database.
exports.deleteAll = (req, res) => {
  Game.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all games.",
      });
    else res.send({ message: `All Games were deleted successfully!` });
  });
};
