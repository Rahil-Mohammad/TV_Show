import { createSelector } from "reselect";
import { State } from "../store";

const castSelector = (state: State) => state.Cast;

const castMapSelector = createSelector(castSelector, (Cast) => {
    return Cast.cast;
});

export const castLoadingSelector = createSelector(castSelector, (cast) => {
    return cast.loading;
});

export const allCastSelector = createSelector(castMapSelector, (castMap) => {
    // Ensure the castMap is an object before processing
    if (typeof castMap !== 'object' || castMap === null) {
        return [];
    }
    return Object.keys(castMap).map((id) => castMap[+id]);
});
