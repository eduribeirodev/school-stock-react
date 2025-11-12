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

const SupplierService = {
    
  // Função para buscar todos os fornecedores
  getAll: async () => {
    const response = await myAxios.get("/supplier", {
      headers: getAuthHeaders(), 
    });

    return response.data.data;
  },

  // Função para criar um novo fornecedor
  create: async (data) => {
    const response = await myAxios.post("/supplier/store", data, {
      headers: getAuthHeadersWithContent(),
    });
    return response.data;
  },

  // Função para remover um fornecedor
  remove: async (id) => {
    const response = await myAxios.delete(`/supplier/${id}`, {
      headers: getAuthHeaders(), 
    });
    return response.data;
  },

  // Função para buscar um fornecedor específico
  show: async (id) => {
    const response = await myAxios.get(`/supplier/${id}`, {
      headers: getAuthHeaders(), 
    });
    
    return response.data;
  },

  // Função para atualizar um fornecedor
  update: async (id, { name, contact }) => {
    const dataToSend = {
      name,
      contact,
      _method: "PUT",
    };

    const response = await myAxios.post(`/supplier/${id}`, dataToSend, {
      headers: getAuthHeadersWithContent(), 
    });

    
    return response.data.data;
  },
};

export default SupplierService;