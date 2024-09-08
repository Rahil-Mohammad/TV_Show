import { AnyAction } from "redux";
import { Cast } from "../models/cast";
import { produce } from "immer";
import { LOAD_Cast_SHOW_DETAILS, LOADED_CAST_SHOW_DETAILS } from "../actions/cast";
import { normalize, schema } from "normalizr";


export type State = {
  cast: { [id: number]: Cast }
  loading: boolean
}
const initialValue: State = {
  cast: {},
  loading: false,
}

const CastReducer = (state = initialValue, action: AnyAction): State => {
  switch (action.type) {
    case LOADED_CAST_SHOW_DETAILS:
      return produce(state, (draft) => {
        const data = action.payload as Cast[];
        const castEntity = new schema.Entity("castEntity");
        const normalizedata = normalize(data, [castEntity]);
        draft.cast = normalizedata.entities.castEntity || {};

        draft.loading = false;
      });
    case LOAD_Cast_SHOW_DETAILS:
      return produce(state, (draft) => {
        draft.loading = true;
      });
    default: return state;

  }
}

export default CastReducer;