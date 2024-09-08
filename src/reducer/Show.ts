import { AnyAction } from "redux";
import { produce } from "immer";
import { Show } from "../models/show";
import { SHOW_DETAILS_LOADED, SHOWS_LOADED, SHOWS_QUERY_CHANGE } from "../actions/Show";
import { normalize, schema } from "normalizr";
import { Cast } from "../models/cast";

export type State = {
    shows: { [showId: number]: Show };
    queryShows: { [query: string]: number[] };
    query: string,
    loading:boolean,
    castShow: { [key: number]: Cast[] };
    showDropdown: boolean;
};

export const initialState: State = {
    shows: {},
    query: "",
    queryShows: {},
    loading:false,
    castShow:{},
    showDropdown:false,

};

function ShowReducer(state = initialState, action: AnyAction): State {
    switch (action.type) {
        case SHOWS_LOADED:
            return produce(state, (draft) => {
                const shows = action.payload.show as Show[];
                //  k
                const showSchema = new schema.Entity("shows");
                const normalizedShows = normalize(shows, [showSchema]);

                draft.queryShows[draft.query] = normalizedShows.result;

                draft.shows = { ...draft.shows, ...normalizedShows.entities.shows };

            });
        case SHOWS_QUERY_CHANGE:
            return produce(state, (draft) => {
                draft.query = action.payload;
            });
        case SHOW_DETAILS_LOADED:
            return produce(state, (draft) => {
                const show = action.payload as Show
                draft.shows[show.id] = show;
            });


        default:
            return state;
    }
}



export default ShowReducer;