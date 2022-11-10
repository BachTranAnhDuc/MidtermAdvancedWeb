import {
    GET_ALL_USER
}
from './action'

const reducer = (state, action) =>{
    if(action.type === 'GET ALL USER')
        return {...state, user: action.payload}
}

export default reducer