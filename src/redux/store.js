import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

//reducers
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const reducers = combineReducers({
  user: userReducer,
  // data: dataReducer,
  UI: uiReducer,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));
const store = createStore(reducers, enhancer);
export default store;
