const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');

app.use(cors());


const sessionId = 15;

const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

io.on("connection",(socket)=>{
    

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



});


app.get('/CreateSession',(req,res)=>{

    res.send({"sessionId" : sessionId});
});



server.listen(5000,console.log(`app running on port ${5000}`));