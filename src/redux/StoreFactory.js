import { createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware  from 'redux-thunk'


//pesist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const factory = function(reducers,whiteList){

  const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: whiteList
  }



 const persistedReducer= persistReducer(persistConfig, reducers);
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions 
    ),
  );
  
  let store = createStore(persistedReducer, {}, enhancer);
  let persistor = persistStore(store);
   return { store, persistor } ;
}
export default factory;
