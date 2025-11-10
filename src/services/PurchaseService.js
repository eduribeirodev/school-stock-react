import myAxios from "../api/axiosInstance";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
};

const PurchaseService = {
    list: async (pageNumber = 1) => {
        const response = await myAxios.get("/purchase", {
            params: { page: pageNumber },
            headers: getAuthHeaders(),
        });
        return response.data; 
    },
    
    register: async (purchaseData) => { 
        const response = await myAxios.post("/purchase", purchaseData, {
            headers: getAuthHeaders(),
        });
        return response.data; 
    },
    
    remove: async (purchaseId) => { 
        const response = await myAxios.delete(`/purchase/${purchaseId}`, {
            headers: getAuthHeaders(),
        });
        return response.data; 
    },
};

export default PurchaseService;