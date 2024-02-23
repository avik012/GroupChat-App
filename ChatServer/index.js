const io = require('socket.io')(8000, {
  cors: {
    origin: '*',
  }
})

// console.log('Yes you can see me outer') 
const users = {}
io.on('connection', socket=>{
  socket.on('new-user-joined',name=>{
    users[socket.id]= name;
    socket.broadcast.emit('user-joined',name)
    // console.log('joined user name',name)
        })
        socket.on('sendMessage',msg=>{
          socket.broadcast.emit('receive',{name:users[socket.id],message:msg})
        })
        socket.on('disconnect',()=>{
          socket.broadcast.emit('left-chat',{name:users[socket.id]})
          // delete users[socket.id]
        })

    })
    
