// export const createProject = (project) => {
//     return {
//         type: 'ADD_PROJECT',
//         project: project
//     }
// }
export const createSnippet = (snippet) => {
    return (dispatch, getState, {getFirebase, getFirestore})  => {
        //make async call to database
        const firestore = getFirestore();
        const profile  = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('snippets').add({
            ...snippet,                        
            uid: authorId,
            createAt: new Date()
        }).then(() => {
            dispatch({
                type: 'CREATE_SNIPPET', 
                snippet: snippet
            })
        }).catch((err) => {
            console.log(err);
            dispatch({type: 'CREATE_SNIPPET_ERROR', err})
        })
    }
};

export const deleteSnippet = id => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      
      firestore.collection('snippets').doc(id)
        .delete()
        .then(() => {
          dispatch({ type: 'DELETE_SNIPPET', id })
        }).catch(err => {
          dispatch({ type: 'DELETE_SNIPPET_ERROR', err })
      })
    }
  };
  