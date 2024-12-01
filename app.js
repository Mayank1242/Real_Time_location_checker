let express=require('express')
let app=express()
const path= require('path')
//Sccoket IO SETUP
const http=require('http')
const socketio=require("socket.io")
const server=http.createServer(app)
const io =socketio(server)

//Setup Public File or Middleares we can say
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))

io.on("connection", (socket)=>{
    console.log("connected");
    socket.on("send-location",(data)=>{

        io.emit("receive-location",{id:socket.id,...data})
    })
    
});

app.get("/",(req,res)=>{
    res.render('index')
});

server.listen(3000,()=>{
    console.log("Server Running");
    
});