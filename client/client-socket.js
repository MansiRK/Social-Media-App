import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

const ClientSocket = () => {
  
    const {auth, socket} = useSelector(state => state)

    const dispatch = useDispatch()

    useEffect(() => {
        socket.emit("userJoin", auth.user)
    }, [socket, auth.user])

    useEffect(() => {
        socket.on("likeToClient", postId => {

        })

        return ()  => socket.off("likeToClient")
    }, [socket, dispatch])

}

export default ClientSocket
