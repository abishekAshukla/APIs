const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();


const app = express()
const port = 5000

app.get('/express', (req, res) => { res.send('Hello from Express!')})
app.get('/node', (req, res) => { res.send('creating blog203 send email')})

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
// on 'localhost:3000/api/auth' 'auth.js' will be served
app.use('/api/notes', require('./routes/notes'))
app.use('/api/user', require('./routes/user'))
app.use('/api/chat', require('./routes/chat'))
app.use('/api/message', require('./routes/message'))
app.use('/api/blogs', require('./routes/blogpost'))
app.use('/api/mail', require('./routes/mail'))


// app.listen(process.env.PORT || port, () => {
//   console.log(`iNoteBook BackEnd listening at http://localhost:${port}`)
// })

const server = app.listen(process.env.PORT || port, console.log(`server started on ${port}`))

const io = require('socket.io')(server , {
  pingTimeout: 60000,
  cors: {
      origin: "https://talk-a-tive.netlify.app",
  },
})

io.on("connection" , (socket) => {
  console.log("connected to socket.io");

  socket.on("setup" , (userData) => {
      socket.join(userData._id);
      console.log(userData._id);
      socket.emit("connected")
  })

  socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });

  socket.on("typing", (room) => socket.in(room).emit("typing"))  
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))  

   socket.on("new message" , (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;

  if (!chat.users) return console.log("chat.users not defined");

  chat.users.forEach((user) => {
    if (user._id == newMessageRecieved.sender._id) return;

    socket.in(user._id).emit("message recieved", newMessageRecieved);
  });
   }) 

  //  very importnat step, closing the connection to save the bandwidth
   socket.off("setup", () => {
       console.log("USER DISCONNECTED");
       socket.leave(userData._id)
   })
})


