import { type } from '../types/types'

export const setError = ( msg ) => ({
    type: type.msgSetError,
    payload: msg
});

export const removeError = () => ({
    type: type.msgRemoveError
});
