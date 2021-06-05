const mongooseClient = require('mongoose');
const playerDto = require('mongoose');

const GameSession = mongooseClient.Schema({
    gameSessionId : String,
    adminDetails : {userName : String},
    player : {userName : String},

});

const gameSessionDto =  mongooseClient.model('gameSession2',GameSession);

module.exports = gameSessionDto;

module.exports.addGameSession = (adminDetails) =>{
    gameSessionDto.create()
}