import axios from "axios";
import { Show } from "./models/show";
import { Cast } from "./models/cast";

export const searchShows = async (keyword: string) => {
    const respone = await axios.get<{ show: Show; }[]>("https://api.tvmaze.com/search/shows?q=" + keyword);
    return respone.data.map((item) => item.show);
}

export const searchShows2 = async (keyword: string) => {
    const showRespone = await axios.get<{ show: Show; }[]>("https://api.tvmaze.com/search/shows?q=" + keyword)
    const shows = showRespone.data.map((item) => item.show);
    // const output = [];
    const output:{[key:number]:Cast[]}={};
    for (let i = 0; i < shows.length; i++) {
        const show = shows[i];
        const castRespone = await axios.get(
            "https://api.tvmaze.com/shows/" + show.id + "/cast"
        );

        const cast = castRespone.data.map((item: any) => item.person);
        // output.push({ show, cast });
        output[shows[i].id] = cast;
    }
}
export const searchShows3=async (keyword:string)=>{
    const showResponse=await axios.get("https://api.tvmaze.com/search/shows?q="+keyword)
    const showList=showResponse.data.map((item:any)=>  item.show)
    const AllCast:{ [key: number]: Cast[] }={}
    for(let i:number=0;i<showList.length;i++){
       const cast= await axios.get("https://api.tvmaze.com/shows/"+showList[i].id+"/cast")
        const castDetail=cast.data.map((item:any)=>item.person)
        AllCast[showList[i].id]=castDetail
    }
   
    return {show:showList,cast:AllCast}
}

    export const loadShowdetails = async (showId: number) => {
        const response = await axios.get<Show>("https://api.tvmaze.com/shows/" + showId);
        return response.data;
    }
// export const loadShowdetails = (showId: number) => {
//     return axios.get<Show>("https://api.tvmaze.com/shows/" + showId).then(response => response.data);
 

export const getSingleShow=async (id:number)=>{
    const res = await axios.get("https://api.tvmaze.com/shows/" + id);
    console.log("res", res.data);
    return res.data;
}
export const  castShowDetail= async (id:number)=>{
    const  response= await axios.get("https://api.tvmaze.com/shows/"+id+"/cast")
    console.log("resCast",response)
    return response.data.map((item:any)=>item.person)||[]  
 }