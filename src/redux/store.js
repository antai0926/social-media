import { createStore, applyMiddleware, combineReducers } from 'redux';
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

const store = createStore(reducers, applyMiddleware(...middlewares));
export default store;
