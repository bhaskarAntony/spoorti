import { rootReducer } from './reducers';
import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const middleware = applyMiddleware(promise, thunk, logger);

const store = () => { 
    return createStore(rootReducer, middleware);
};

export default store;

