import api from "./axios.ts";
import {CitiesEntity} from "../types/models/CitiesEntity.ts";
import {StoreEntity} from "../types/models/StoreEntity.ts";


export const fetchCities = async (): Promise<CitiesEntity[]> => {
    const response = await api.get<CitiesEntity[]>('api/cities');
    return response.data;
};

export const fetchStorePoints = async (cityId: number): Promise<StoreEntity[]> => {
    const res = await api.get(`api/cities/${cityId}/stores`);
    return res.data;
};


