import { combineReducers } from 'redux';
import { commonReducer } from "./common/reducer";

export const rootReducer = combineReducers({
    common: commonReducer
});
