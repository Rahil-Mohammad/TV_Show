import {call, put } from "redux-saga/effects";
import { getSingleShow, loadShowdetails, searchShows, searchShows2, searchShows3 } from "../api";
import { Action } from "../actions";
import { showDetailsAction, ShowsLoadedAction } from "../actions/Show";

export function* fetchShows(action:Action):Generator<any,any,any>{
    const shows=yield call(searchShows3, action.payload);
   // console.log("shhows from saga show ",shows);
    yield put( ShowsLoadedAction(shows.show, shows.cast));
    //console.log("Shows",shows);
}
export function* fetchShowDetails(action:Action):Generator<any,any,any>{
    const show=yield call(loadShowdetails, action.payload);
    yield put (showDetailsAction(show));
}

export function* fetchShowDetails5(action:Action):Generator<any,any,any>{
    const show = yield call(getSingleShow,action.payload)
    yield put (showDetailsAction(show));
}


