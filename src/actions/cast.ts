import { ActionCreator } from ".";
import { Cast } from "../models/cast";

export const LOAD_Cast_SHOW_DETAILS = "LOAD_Cast_SHOW_DETAILS";

export const loadCastShowDetailsAction : ActionCreator<number> =(id:number)=>({
  type:LOAD_Cast_SHOW_DETAILS,
  payload:id,
});


export const LOADED_CAST_SHOW_DETAILS = "LOADED_CAST_SHOW_DETAILS";

export const loadedCastAction : ActionCreator<Cast> =(cast:Cast)=>({
  type:LOADED_CAST_SHOW_DETAILS,
  payload:cast,
});