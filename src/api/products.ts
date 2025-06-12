import api from "./axios.ts";
import {ProductsEntity} from "../types/models/ProductsEntity.ts";

export const fetchProducts = async (): Promise<ProductsEntity[]> => {
    const res = await api.get('api/products', {
        params: { limit: 0, offset: 0 }
    });
    return res.data.list;
};


