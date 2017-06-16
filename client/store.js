/**
 * Created by qg on 12/06/17.
 */

import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'; //https://stackoverflow.com/a/35415559/1929671

import reducer from "./reducers";
import logger from 'redux-logger'

export default createStore(
    reducer,
    applyMiddleware(logger, thunk)
)