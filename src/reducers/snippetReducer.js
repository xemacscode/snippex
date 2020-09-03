const initState = {
    projects: [
        {id: '1', title: 'Help me find peach', content: 'bla bla blah'},
        {id: '2', title: 'Another project', content: 'bla bla blah'},
        {id: '3', title: 'Learning react is awesome', content: 'bla bla blah'}
    ]
}

const snippetReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_SNIPPET':
            console.log('created Snippet', action.snippet);
            return state;
            break;
        case 'CREATE_SNIPPET_ERROR':
            console.log('Create project error', action.err)
            break;
        case 'DELETE_SNIPPET':
        console.log('delete project');
        return state;
        case 'DELETE_SNIPPET_ERROR':
        console.log('delete project error', 'state: ', state, 'action: ', action.snippet);
        return state;
        default: 
            return state;
        break;
    }    
}

export default snippetReducer;