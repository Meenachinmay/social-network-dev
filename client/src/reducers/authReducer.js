import isEmpty from '../validations/is-empty';
import { SET_CURRENT_USER } from '../actions/types'; 


const initialState = {
    isAuthtenticated: false,
    user: {},
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthtenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default: 
            return state;
    }
}