import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';

// get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    console.log('hello world')
    axios.get('/api/profile')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })    
        ).catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        )
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING,
    }
}

// Clear current profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}