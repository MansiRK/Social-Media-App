/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
const users = []

const ServerSocket = (socket) => {
  socket.on("userJoin", (user) => {
    users.push({
      id: user._id,
      socketId: socket.id,
    })
  })

  socket.on("disconnect", () => {
    const index = users.findIndex((user) => {
      user.socketId === socket.id
    })

    if (index !== -1) {
      users.splice(index, 1)
    }
  })

  socket.on("likePost", (postId, userId) => {
    const recipients = users.filter((user) => {
      user.userId === userId || user.userId.followers.includes(userId)
    })

    recipients.forEach((recipient) => {
      socket.to(recipient.socketId).emit("likeToClient", postId)
    })
  })
}