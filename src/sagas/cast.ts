import { call, put } from "redux-saga/effects";
import { Action } from "../actions";
import { castShowDetail, getSingleShow } from "../api";
import {  loadedCastAction } from "../actions/cast";

export function* feactCastDetail(action:Action):Generator<any,any,any> {

    const cast =  yield call(castShowDetail,action.payload);
    yield put (loadedCastAction(cast));

}
