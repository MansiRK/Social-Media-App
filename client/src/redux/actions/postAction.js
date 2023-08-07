import axios from "axios";
import {message} from 'antd'
export const addPost =(values)=>async dispatch=>{ 
    values.user = JSON.parse(localStorage.getItem('user'))._id
    values.likes = []
    values.comments = []
   
    dispatch({type:'LOADING', payload:true}) //we are using redux thunk, values receive from ui
    try {
        await axios.post('/api/posts/addpost', values)
        dispatch({type :'LOADING', payload:false})
        message.success('Post added successfully')
        

    } catch (error) {
        dispatch({type :'LOADING', payload:false})
        dispatch({type:'LOADING' , payload:false})
        message.error('Post not add successfully')

    }
}

export const getAllPosts =()=>async dispatch=>{
    
    dispatch({type:'LOADING' , payload:true})

    try {
        const response = await axios.get('/api/posts/getallposts')
        dispatch({type:'LOADING' , payload:false})
        dispatch({type:'GET_ALL_POSTS' , payload:response.data})
        
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING' , payload:false})
        message.error('something went wrong')
    }

}
export const likeorunlikepost =(values)=>async dispatch=>{ 
    values.userid = JSON.parse(localStorage.getItem('user'))._id.toString()
   
    dispatch({type:'LOADING', payload:true}) //we are using redux thunk, values receive from ui
    try {
        await axios.post('/api/posts/likeorunlikepost', values)
        dispatch({type :'LOADING', payload:false})
        message.success('Post liked successfully')
        

    } catch (error) {
        console.log(error)
        dispatch({type :'LOADING', payload:false})
        message.error('Post unliked successfully')

    }
}