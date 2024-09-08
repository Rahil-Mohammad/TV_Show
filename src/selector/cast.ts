import { createSelector } from "reselect";
import { State } from "../store";

const castSelector = (state: State) => state.Cast;


const castMapSelector = createSelector(castSelector, (Cast) => {
    return Cast.cast;
});

export const castLoadingSelector = createSelector(castSelector, (cast) => {
    return cast.loading;
});

export const allCastSelector = createSelector(castMapSelector, (cast) => {
    return Object.keys(cast).map((id) => cast[+id])
});
