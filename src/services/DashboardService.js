import myAxios from "../api/axiosInstance";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
};

const DashboardService = {
    
    getDashboardData: async (params = {}) => {
        const response = await myAxios.get("/dashboard", {
            params: params, 
            headers: getAuthHeaders(),
        });
        return response.data; 
    },
    
  
    getSaleProjection: async (fromDate, toDate) => {
        const response = await myAxios.get("/saleProjection", {
            params: { fromDate, toDate },
            headers: getAuthHeaders(),
        });
        return response.data; 
    },
};

export default DashboardService;