import * as type from './types'
export const toggleMenu = () => {
    return (dispatch) => {
        dispatch({type: type.TOGGLE_MENU})
    }
}






