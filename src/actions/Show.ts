
import { ActionCreator } from ".";
import { Cast } from "../models/cast";
import { Show } from "../models/show";

 
 export const SHOWS_LOADED = "SHOWS_LOADED";

export const ShowsLoadedAction:ActionCreator<{show:Show[],cast:{[id:number]:Cast[]}}>=(show:Show[],cast:{[id:number]:Cast[]})=>({
  type:SHOWS_LOADED,
  payload:{show,cast}

})


 
 export const SHOWS_QUERY_CHANGE = "SHOWS_QUERY_CHANGE";
 
 export const ShowsQueryChangeAction : ActionCreator<string> =(query)=>({
   type:SHOWS_QUERY_CHANGE,
   payload:query,
 });


 
 export const SHOW_DETAILS_LOADED = "SHOW_DETAILS_LOADED";
 
 export const showDetailsAction : ActionCreator<Show> =(show:Show)=>({
   type:SHOW_DETAILS_LOADED,
   payload:show,
 });

 
 export const LOAD_SHOW_ACTION = "LOAD_SHOW_ACTION";
 
 export const loadShowAction : ActionCreator<number> =(showId:number)=>({
   type:LOAD_SHOW_ACTION,
   payload:showId,
 });