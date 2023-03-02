import usuarioReducer from './usuario';
import  uiReducer from "./ui";
import { combineReducers } from 'redux';

export default combineReducers(
  Object.assign(
    {},
    { usuario: usuarioReducer , ui:uiReducer }
  ),
);
