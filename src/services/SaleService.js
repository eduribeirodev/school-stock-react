
import myAxios from "../api/axiosInstance";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
};

const SaleService = {
    
    list: async (pageNumber = 1) => {
        const response = await myAxios.get("/sale", {
      
            params: { page: pageNumber }, 
            headers: getAuthHeaders(),
        });
        return response; 
    },
    
   
    checkout: async (saleData) => { 
        
        const response = await myAxios.post("/sale/register", saleData, {
            headers: getAuthHeaders(),
        });
        return response.data; 
    },
    
    
    update: async (saleId, saleData) => { 
        // ... (Implementação de update) ...
        const response = await myAxios.put(`/sale/${saleId}`, saleData, {
            headers: getAuthHeaders(),
        });
        return response.data; 
    },

};

export default SaleService;