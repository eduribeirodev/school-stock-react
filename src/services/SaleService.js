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

const SaleService = {
    
  // Função para listar as vendas (paginadas)
  list: async (pageNumber = 1) => {
    const response = await myAxios.get("/sale", {
      params: { page: pageNumber },
      headers: getAuthHeaders(), 
    });
    return response.data; 
  },

  // Função para registar (checkout) uma nova venda
  checkout: async (saleData) => {
    const response = await myAxios.post("/sale/register", saleData, {
      headers: getAuthHeadersWithContent(), 
    });
    return response.data;
  },

  // Função para atualizar uma venda
  update: async (saleId, saleData) => {
    const response = await myAxios.put(`/sale/${saleId}`, saleData, {
      headers: getAuthHeadersWithContent(), 
    });
    return response.data;
  },
};

export default SaleService;