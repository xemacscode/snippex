// export const createProject = (project) => {
//     return {
//         type: 'ADD_PROJECT',
//         project: project
//     }
// }
export const createFolder = (folder) => {
    return (dispatch, getState, {getFirebase, getFirestore})  => {
        //make async call to database
        const firestore = getFirestore();
        const profile  = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('folders').add({
            name: folder, 
            uid: authorId,
            createAt: new Date()
        }).then(() => {
            dispatch({
                type: 'CREATE_FOLDER', 
                folder: folder
            })
        }).catch((err) => {
            console.log(err);
            dispatch({type: 'CREATE_FOLDER_ERROR', err})
        })
    }
};

export const deleteFolder = id => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      
      firestore.collection('folders').doc(id)
        .delete()
        .then(() => {
          dispatch({ type: 'DELETE_FOLDER', id })
        }).catch(err => {
          dispatch({ type: 'DELETE_FOLDER_ERROR', err })
      })
    }
  };
  