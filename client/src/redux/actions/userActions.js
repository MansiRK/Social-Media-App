import axios from "axios";
import {message} from 'antd'
export const userRegister =(values)=>async dispatch=>{ 
    dispatch({type:'LOADING', payload:true}) //we are using redux thunk, values receive from ui
    try {
        await axios.post('/api/users/register', values)
        dispatch({type :'LOADING', payload:false})
        message.success('User registered successfully')
        window.location.href='/login'

    } catch (error) {
        console.log(error)
        dispatch({type :'LOADING', payload:false})
        dispatch({type:'LOADING' , payload:false})
        message.error('User not register successfully')

    }
}
export const userLogin =(values)=>async dispatch=>{ 
    dispatch({type:'LOADING', payload:true}) //we are using redux thunk, values receive from ui
    try {
        const response = await axios.post('/api/users/login', values)
        dispatch({type :'LOADING', payload:false})
        message.success('Login success')
        // eslint-disable-next-line no-undef
        localStorage.setItem('user' , JSON.stringify(response.data))
        window.location.href='/'
    } catch (error) {
        console.log(error)
        dispatch({type:'LOADING' , payload:false})
        message.error('User not logged successfully')
    }
}