let users = []

const EditData = (data, id, call) => {
  const newData = data.map((item) => (item.id === id ? { ...item, call } : item))
  return newData
}

const SocketServer = (socket) => {
  // Connect - Disconnect
  socket.on('joinUser', (user) => {
    // eslint-disable-next-line no-underscore-dangle
    users.push({ id: user._id, socketId: socket.id, followers: user.followers })
  })

  socket.on('disconnect', () => {
    const data = users.find((user) => user.socketId === socket.id)
    if (data) {
      // eslint-disable-next-line no-underscore-dangle
      const clients = users.filter((user) => data.followers.find((item) => item._id === user.id))

      if (clients.length > 0) {
        clients.forEach((client) => {
          socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
        })
      }

      if (data.call) {
        const callUser = users.find((user) => user.id === data.call)
        if (callUser) {
          users = EditData(users, callUser.id, null)
          socket.to(`${callUser.socketId}`).emit('callerDisconnect')
        }
      }
    }

    users = users.filter((user) => user.socketId !== socket.id)
  })

  // Likes
  socket.on('likePost', (newPost) => {
    // eslint-disable-next-line no-underscore-dangle
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter((user) => ids.includes(user.id))

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('likeToClient', newPost)
      })
    }
  })

  socket.on('unLikePost', (newPost) => {
    // eslint-disable-next-line no-underscore-dangle
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter((user) => ids.includes(user.id))

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('unLikeToClient', newPost)
      })
    }
  })

  // Comments
  socket.on('createComment', (newPost) => {
    // eslint-disable-next-line no-underscore-dangle
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter((user) => ids.includes(user.id))

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('createCommentToClient', newPost)
      })
    }
  })

  socket.on('deleteComment', (newPost) => {
    // eslint-disable-next-line no-underscore-dangle
    const ids = [...newPost.user.followers, newPost.user._id]
    const clients = users.filter((user) => ids.includes(user.id))

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost)
      })
    }
  })

  // Follow
  socket.on('follow', (newUser) => {
    // eslint-disable-next-line no-underscore-dangle, no-shadow
    const user = users.find((user) => user.id === newUser._id)
    // eslint-disable-next-line no-unused-expressions
    user && socket.to(`${user.socketId}`).emit('followToClient', newUser)
  })

  socket.on('unFollow', (newUser) => {
    // eslint-disable-next-line no-underscore-dangle, no-shadow
    const user = users.find((user) => user.id === newUser._id)
    // eslint-disable-next-line no-unused-expressions
    user && socket.to(`${user.socketId}`).emit('unFollowToClient', newUser)
  })

  // Notification
  socket.on('createNotify', (message) => {
    const client = users.find((user) => message.recipients.includes(user.id))
    // eslint-disable-next-line no-unused-expressions
    client && socket.to(`${client.socketId}`).emit('createNotifyToClient', message)
  })

  socket.on('removeNotify', (message) => {
    const client = users.find((user) => message.recipients.includes(user.id))
    // eslint-disable-next-line no-unused-expressions
    client && socket.to(`${client.socketId}`).emit('removeNotifyToClient', message)
  })
}

module.exports = SocketServer
