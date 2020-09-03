const initState = {
    authError: null
}

const authReduder = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null
            }
        case 'LOGIN_ERR':
            console.log('login failed');
            return {
                ...state, 
                authError: 'Login failed'
            }
        case 'SIGN_OUT_SUCCESS':
            console.log('SIGN_OUT_SUCCESS');
            return state;
        case 'SIGN_UP_SUCCESS':
            console.log('SIGN UP SUCCESS');
            return{
                ...state,
                authError: null
            }
        case 'SIGN_UP_ERROR': 
            console.log('Sign up error');
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state
    }    
}

export default authReduder;