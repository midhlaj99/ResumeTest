import { applyMiddleware, createStore } from "redux"

import { createLogger } from "redux-logger"
import thunk from "redux-thunk"

import combine_reducer from "./CombineReducer";
const middleware = applyMiddleware( thunk, createLogger())
export default createStore(combine_reducer, middleware)