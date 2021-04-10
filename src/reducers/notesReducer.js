/**
 *  {
 *      note[],
 *      activate: null
 *      
 *      activate: {
 *          id:'ASDADQSADASDS8655DSAD65SA67D'
 *          title: 'Test'
 *          body: 'Test'
 *          urlImg: 'https://text.es'
 *          date: 121312312313
 *      }
 * 
 *  } 
 */

 const initialState = {
    note: [],
    activate: null,
}

export const notesReducer = (state = initialState, action ) => {
    switch (action.type) {
        
        default:
            return state;
    }
}