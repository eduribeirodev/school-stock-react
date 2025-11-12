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

const ProductService = {
        
  // Função para buscar uma lista paginada de produtos
  getAll: async (page = 1, limit = 10) => {
    const response = await myAxios.get("/product", {
      headers: getAuthHeaders(),
      params: { page, limit }, 
    });
    return response.data.data ?? response.data;
  },

  // Função para remover um produto
  remove: async (id) => {
    const response = await myAxios.delete(`/product/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },

  // Função para atualizar um produto
  updateProduct: async (id, data) => {
    const response = await myAxios.put(`/product/${id}`, data, {
      headers: getAuthHeadersWithContent(), 
    });
   
    return response.data.data ?? response.data.product ?? response.data;
  },

  // Função para criar um novo produto
  createProduct: async (data) => {
    const response = await myAxios.post("product/store", data, {
      headers: getAuthHeadersWithContent(),
    });
    return response.data;
  },
};

export default ProductService;