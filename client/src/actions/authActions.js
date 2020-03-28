import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';


// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(error => 
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
        })    
    );
}


// Login - Get user token
export const loginUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            // save to localStorage
            const { token } = res.data;
            // Set token to ls
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // set the current user
            dispatch(setCurrentUser(decoded));
            history.push('/dashboard');
        })
        .catch(error => 
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
        })    
    );
}

// set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}