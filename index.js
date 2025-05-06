const express= require('express');
const bodyParser=require('body-parser');
const {Server} = require('socket.io');

const io= new Server(
    {
        cors:true,
    }
);
const app=express();

app.use(bodyParser.json());
const emailToSocketMaping= new Map();

io.on('connection',socket=>{

    console.log("new conection");
    
    socket.on("joinroom",(data)=>{
       
        const {roomId, emailId}=data;
        console.log("user", emailId, "joined Room", roomId);
        emailToSocketMaping.set(emailId,socket.id);
        socket.join(roomId);
        socket.emit('Joined-room', {roomId});  
        socket.broadcast.to(roomId).emit("user-joined", {emailId});

    })
})



app.listen(8000, ()=>console.log('✅ Server listening on http://localhost:8000'));
io.listen(5000);