import {
    GET_ALL_USER
}
from './action'

const reducer = (state, action) =>{
    if(action.type === GET_ALL_USER)
        return {...state, user: action.payload}
}

export default reducer