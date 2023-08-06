const initialState = {
    users: []
}

// eslint-disable-next-line no-unused-vars
export const usersReducer = (state = initialState, action) => {
    switch (action.type){
        case 'GET_USER': {
            return {
               
            }   
        }
       default: return state;
    }
}

