import { applyMiddleware, combineReducers, createStore } from "redux";
import ShowReducer from "./reducer/Show";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";
import {  debounce, takeEvery, takeLatest } from "redux-saga/effects";
import { LOAD_SHOW_ACTION, SHOWS_QUERY_CHANGE } from "./actions/Show";
import { fetchShowDetails, fetchShows } from "./sagas/shows";
import CastReducer from "./reducer/cast";
import { LOAD_Cast_SHOW_DETAILS } from "./actions/cast";
import { feactCastDetail } from "./sagas/cast";

const reducer = combineReducers({
    shows:ShowReducer,
    Cast:CastReducer,
});

function* rootSaga(){
    yield debounce(100,SHOWS_QUERY_CHANGE,fetchShows);
    yield takeEvery(LOAD_SHOW_ACTION,fetchShowDetails);
    yield takeEvery(LOAD_Cast_SHOW_DETAILS,feactCastDetail);

}

const sagaMiddleware =createSagaMiddleware();

const store = createStore(reducer,composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export type State =ReturnType<typeof reducer>;

export default store;


