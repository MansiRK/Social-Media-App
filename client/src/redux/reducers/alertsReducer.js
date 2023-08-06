const initialState = {
    loading:false,
    likeorunlikeloading: false,
}

const alertsReducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOADING': return{
            ...state,
            loading : action.payload
        } 
        
        default:
            return state;
            
    }
}


export default alertsReducer