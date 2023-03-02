import createReducer from '../createReducer';
import * as type from '../actions/types';

const defaultState = {
  mostrarMenu:true,
};

export default createReducer(defaultState, {
  [type.TOGGLE_MENU](state, action) {
    return {...state, mostrarMenu:!state.mostrarMenu};
  },
});
