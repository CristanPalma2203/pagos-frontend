import * as type from './types'
export const login = (state) => {
    return (dispatch) => {
        dispatch(logged({ ...state, autenticado: true }))
    }
}
export const logged = (state) => {
    return Object.assign({ type: type.LOGGED }, state)
}


export const logout = () => {
    
    return (dispatch) => {
        dispatch(takenout());
    }
}

export const takenout = () => {
    return {
        type: type.LOGOUT
    };
}






