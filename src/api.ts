import axios from "axios";
import { Show } from "./models/show";
import { Cast } from "./models/cast";

const API_BASE_URL = "https://api.tvmaze.com";

export const searchShows = async (keyword: string): Promise<Show[]> => {
    try {
        const response = await axios.get<{ show: Show; }[]>(`${API_BASE_URL}/search/shows?q=${keyword}`);
        return response.data.map((item) => item.show);
    } catch (error) {
        console.error("Error fetching shows:", error);
        return [];
    }
}

export const searchShows2 = async (keyword: string): Promise<{ [key: number]: Cast[] }> => {
    try {
        const showResponse = await axios.get<{ show: Show; }[]>(`${API_BASE_URL}/search/shows?q=${keyword}`);
        const shows = showResponse.data.map((item) => item.show);
        const output: { [key: number]: Cast[] } = {};

        for (const show of shows) {
            const castResponse = await axios.get<Cast[]>(`${API_BASE_URL}/shows/${show.id}/cast`);
            output[show.id] = castResponse.data.map((item: any) => item.person);
        }

        return output;
    } catch (error) {
        console.error("Error fetching shows or cast:", error);
        return {};
    }
}

export const searchShows3 = async (keyword: string): Promise<{ show: Show[], cast: { [key: number]: Cast[] } }> => {
    try {
        const showResponse = await axios.get<{ show: Show; }[]>(`${API_BASE_URL}/search/shows?q=${keyword}`);
        const showList = showResponse.data.map((item) => item.show);
        const AllCast: { [key: number]: Cast[] } = {};

        for (const show of showList) {
            const castResponse = await axios.get<Cast[]>(`${API_BASE_URL}/shows/${show.id}/cast`);
            AllCast[show.id] = castResponse.data.map((item: any) => item.person);
        }

        return { show: showList, cast: AllCast };
    } catch (error) {
        console.error("Error fetching shows or cast:", error);
        return { show: [], cast: {} };
    }
}

export const loadShowdetails = async (showId: number): Promise<Show> => {
    try {
        const response = await axios.get<Show>(`${API_BASE_URL}/shows/${showId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching show details:", error);
        throw error; // Re-throw the error after logging it
    }
}

export const getSingleShow = async (id: number): Promise<Show> => {
    try {
        const response = await axios.get<Show>(`${API_BASE_URL}/shows/${id}`);
        console.log("Show details:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching single show:", error);
        throw error; // Re-throw the error after logging it
    }
}

export const castShowDetail = async (id: number): Promise<Cast[]> => {
    try {
        const response = await axios.get<Cast[]>(`${API_BASE_URL}/shows/${id}/cast`);
        console.log("Cast details:", response.data);
        return response.data.map((item: any) => item.person) || [];
    } catch (error) {
        console.error("Error fetching cast details:", error);
        return [];
    }
}
