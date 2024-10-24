const mongoose=require('mongoose');
require('dotenv').config();

//const mongoURL='mongodb://127.0.0.1:27017/hotels'
const mongoURL=process.env.DB_URL;

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


const db=mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongoDB server');
});

db.on('error',()=>{
    console.log('mongoDB connection error',error);
});

db.on('disconnected',()=>{
    console.log('mongoDB disconnected');
});

module.exports=db;