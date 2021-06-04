const mongooseClient = require('mongoose');
const playerDto = require('mongoose');

const GameSession = mongooseClient.Schema({
    gameSessionId : String,
    adminDetails : {},
    playerList : [],

});

const gameSessionDto = mongooseClient.models['gameSession'] || mongooseClient.model('gameSession',GameSession);

module.exports = gameSessionDto;

module.exports.addGameSession = (adminDetails) =>{
    gameSessionDto.create()
}