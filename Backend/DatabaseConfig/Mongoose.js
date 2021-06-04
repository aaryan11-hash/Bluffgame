const mongoose = require('mongoose');

const mongoClient = mongoose.connect('mongodb+srv://aaryan12345:aaryan1101@cluster0.ddchx.mongodb.net/game-session?retryWrites=true&w=majority'
                ,{useNewUrlParser : true,useUnifiedTopology: true},()=>console.log('connected to mongodb Atlas'));

module.exports = mongoClient;