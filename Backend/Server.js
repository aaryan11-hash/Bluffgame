const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const createNewSessionObj = require('./Services/SocketOpServices');
//const socketOpService = require('./Services/SocketOpServices');
app.use(cors());


const sessionId = 15;

const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
});

io.on('connection',(socket)=>{
    
    
    socket.on('test',(data)=>{
        socket.emit('test-reply','reply');
    })

    socket.on('create-session',(userName)=>{
        console.log('create request username: ',userName);
        createNewSessionObj(userName).then(savedEntity=>{
            socket.emit('created-session-event',savedEntity);
        });
        /*this part of the code will generate a sessionId and the repective objects that will be stored in the db as session object data*/ 
        
    })

    socket.on('join-session',(/*this represents the object that will have the session id for a particular session*/data)=>{

        
         //first-check in db if the sessionId object exists or not
        
        /* tentative format of the data that will be sent to the newly joined user

            {
                userList : [{userName : str}],
                adminUser : {userName : str}
            }
        *///this event trigger is for sending data about the state when certain number of user have already joined 
         //the session and we need to provide that data to the newly joined user.
        socket.emit('session-join-meta-data'+data.sessionId,{'message':'the expected object will come in this....'});
        
        socket.broadcast.emit('newUser-joined-session'+data.sessionId,{...data,message:'new member joined'});
       
      
    });

    socket.on('send-lobby-data'+sessionId,(hashMap)=>{
        socket.broadcast.emit('receive-lobby-data'+sessionId,hashMap);
    })



});


app.get('/CreateSession',(req,res)=>{

    res.send({"sessionId" : sessionId});
});



server.listen(5000,console.log(`app running on port ${5000}`));