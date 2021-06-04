const playerDto = require('../Models/Player');
const gameSessionDto = require('../Models/GameSession');
const mongoClient = require('../DatabaseConfig/Mongoose');
const uuid = require('uuid');


const createNewSessionObj =  function(userName){
   
    const sessionId = Math.random().toString(16).substr(2,36-userName.toString().length)+userName;
    //sessionId = sessionId.splice(sessionId.toString().length-username.length)+username;
    const gameSessionOnj = { gameSessionId : sessionId,
        adminDetails : {userName : userName},
        playerList : [{userName : userName}] 
    };

    const savedEntity = gameSessionDto.create(gameSessionOnj);
    console.log(sessionId);

    return savedEntity;
}
  



module.exports = createNewSessionObj;