const playerDto = require('../Models/Player');
const gameSessionDto = require('../Models/GameSession');
const mongoClient = require('../DatabaseConfig/Mongoose');
const uuid = require('uuid');


const createNewSession =  function(userName){
  
    const sessionId = Math.random().toString(16).substr(2,36-userName.toString().length)+userName;
    
    const gameSessionObj = new gameSessionDto({ gameSessionId : sessionId,
        adminDetails : {userName : userName},
        player : {userName : ''} 
    });

    const savedEntity =  gameSessionDto.create(gameSessionObj);


    return savedEntity;
};

const joinCreatedSession = async function(joinSessionDetails) {
    
    
    
    // gameSessionDto.updateOne({gameSessionId:joinSessionDetails.gameSessionId},
    //                                             {player:{userName:joinSessionDetails.userName}},
    //                                             {new : true,
    //                                             runValidators : true,
    //                                             useFindAndModify:false}
    //             ,(err,numAffected)=>{
    //                 if(err) console.log(err);
    //                 console.log('numAffected ',numAffected.length);
    //             });
                
    const gameSessionObj = await gameSessionDto.findOne({gameSessionId : joinSessionDetails.sessionId});                                              
    const update ={ player:{userName:joinSessionDetails.userName}};
    await gameSessionObj.updateOne(update);

    const finalSession = await gameSessionDto.findOne({gameSessionId : joinSessionDetails.sessionId})
    return finalSession;
};



module.exports.createNewSession = createNewSession;
module.exports.joinCreatedSession = joinCreatedSession;