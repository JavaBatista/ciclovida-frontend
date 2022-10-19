// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import session from './session';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, session });

export default reducers;
