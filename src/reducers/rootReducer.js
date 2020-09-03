import authReducer from './authReducer';
import snippetReducer from './snippetReducer';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import folderReducer from './folderReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    project: snippetReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    folder: folderReducer
})

export default rootReducer;