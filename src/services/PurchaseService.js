import myAxios from "../api/axiosInstance";

// Helper para obter o token
const getToken = () => localStorage.getItem("token");

// Helper para headers de autenticação (usado para GET, DELETE)
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  Accept: "application/json",
});

// Helper para headers que também enviam dados JSON (usado for POST, PUT)
const getAuthHeadersWithContent = () => ({
  Authorization: `Bearer ${getToken()}`,
  Accept: "application/json",
  "Content-Type": "application/json",
});

const PurchaseService = {
    
  // Função para listar as compras (paginadas)
  list: async (pageNumber = 1) => {
    const response = await myAxios.get("/purchase", {
      params: { page: pageNumber },
      headers: getAuthHeaders(), 
    });
    return response.data;
  },

  // Função para registar uma nova compra
  register: async (purchaseData) => {
    const response = await myAxios.post("/purchase", purchaseData, {
      headers: getAuthHeadersWithContent(), 
    });
    return response.data;
  },

  // Função para remover uma compra
  remove: async (purchaseId) => {
    const response = await myAxios.delete(`/purchase/${purchaseId}`, {
      headers: getAuthHeaders(), 
    });
    return response.data;
  },
};

export default PurchaseService;