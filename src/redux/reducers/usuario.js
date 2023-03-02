import createReducer from '../createReducer';
import * as type from '../actions/types';

const defaultState = {
  usuario_id:-1,
  correo:'',
  nombre:'',
  apellidos:'',
  autenticado:false,
  cambioContrasena:false,
  token:'',
  menu:[],
  permisos: []
};

export default createReducer(defaultState, {
  [type.LOGGED](state, action) {
    return Object.assign({}, action);
  },
  [type.LOGOUT](state, action) {
    return Object.assign(defaultState, action);
  },
});
