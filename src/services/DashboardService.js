import myAxios from "../api/axiosInstance";

// Helper para obter o token
const getToken = () => localStorage.getItem("token");

// Helper para headers de autenticação (usado para GET, DELETE)
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  Accept: "application/json",
});

const DashboardService = {
    
  // Função para buscar os dados do dashboard
  getDashboardData: async (params = {}) => {
    const response = await myAxios.get("/dashboard", {
      params, 
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  // Função para buscar a projeção de vendas
  getSaleProjection: async (fromDate, toDate) => {
    const response = await myAxios.get("/saleProjection", {
      params: { fromDate, toDate },
      headers: getAuthHeaders(),
    });
    return response.data;
  },
};

export default DashboardService;