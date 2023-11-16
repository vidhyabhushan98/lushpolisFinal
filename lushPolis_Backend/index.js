const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const plants = require('./routes/plant');
const fileUpload = require('express-fileupload'); 
const Message = require('./models/Message');
const chatRoutes = require("./routes/chat.route");
const messageRoutes = require("./routes/message.route");

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors());
app.use(express.json());
app.use(fileUpload()); 
app.use((req,res,next) =>{
  console.log(req.path, req.method);
  next();
} )

const connecctDB = require('./config/db.config');
connecctDB();

app.use('/plants',plants);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

require('./routes/diary.route')(app);
require('./routes/post.route')(app);
require('./routes/auth.route')(app);
require('./routes/user.route')(app);
require('./routes/product.route')(app);


const server = require('http').createServer(app);
  const io = require('socket.io')(server, {
    cors: {
      origin: ['https://lush-polis-frontend-lwoam8w78-tejab-2610s-projects.vercel.app/'],
      //methods: ['GET', 'POST']
    }
  })
  
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
      
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      console.log("new message", newMessageRecieved);
      var chat = newMessageRecieved.chat;
      //var chatObjectId = new mongoose.Types.ObjectId(chat._id);
      // console.log("printing chat",chat)
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });
  
  
  app.delete('/logout', async(req, res)=> {
    try {
      const {_id, newMessages} = req.body;
      const user = await User.findById(_id);
      user.status = "offline";
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit('new-user', members);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(400).send()
    }
  })
  
server.listen(process.env.PORT||3001, () => {
    console.log("Server is running on port 3001");
});



