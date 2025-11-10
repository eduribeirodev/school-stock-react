// src/services/ProductService.js

import myAxios from "../api/axiosInstance";

const getAuthHeaders = (isMultipart = false) => {
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    };
    // Se não for FormData, explicitamos que é JSON
    if (!isMultipart) {
        headers["Content-Type"] = "application/json";
    }
    return headers;
};

const ProductService = {

    getAll: async (page = 1, limit = 10) => {
        const response = await myAxios.get("/product", {
            headers: getAuthHeaders(),
            params: { page: page, limit: limit }
        });
        // Retorna o objeto de paginação completo que o hook espera
        return response.data.data ?? response.data; 
    },

    remove: async (id) => {
        const response = await myAxios.delete(`/product/${id}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    },

    updateProduct: async (id, data) => {
        // Como removemos a foto, não precisamos de FormData, mas garantimos
        // que o Content-Type seja JSON.
        const headers = getAuthHeaders(false); 
        
        const response = await myAxios.put(
            `/product/${id}`,
            data,
            { headers }
        );
        // Retorna o produto atualizado
        return response.data.data ?? response.data.product ?? response.data;
    },

    createProduct: async(data) => {
        // Envio de JSON simples
        const response = await myAxios.post(
            "product/store", 
            data, 
            { headers: getAuthHeaders(false) } // Envia JSON
        );
        return response.data;
    }
};

export default ProductService;