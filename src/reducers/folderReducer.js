const initState = {
    folders: [
        {id: '1', name: 'Help me find peach', datecreated: 'bla bla blah', uid: 'xx'},
        {id: '2', name: 'Another project', datecreated: 'bla bla blah', uid: 'xx'},
        {id: '3', name: 'Learning react is awesome', datecreated: 'bla bla blah', uid: 'xx'}
    ]
}

const folderReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_FOLDER':
            console.log('created FOLDER', action.folder);
            return state;
            break;
        case 'CREATE_FOLDER_ERROR':
            console.log('Create FOLDER error', action.err)
            break;
        case 'DELETE_FOLDER':
        console.log('deleted FOLDER');
        return state;
        case 'DELETE_FOLDER_ERROR':
        console.log('delete FOLDER error', 'state: ', state, 'action: ', action.folder);
        return state;
        default: 
            return state;
        break;
    }    
}

export default folderReducer;