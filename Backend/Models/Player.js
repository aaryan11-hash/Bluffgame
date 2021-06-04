const mongooseClient = require('mongoose');

const Player = mongooseClient.Schema({
    userName : String,
    sessionId : String,
});

const playerDto = mongooseClient.model('player',Player);


module.exports = playerDto