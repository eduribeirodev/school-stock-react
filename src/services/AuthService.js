import myAxios from "../api/axiosInstance";

// Helper para obter o token
const getToken = () => localStorage.getItem("token");

// Helper para headers de autenticação
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  Accept: "application/json",
});

const AuthService = {
  
  // Função para logar na aplicação
  login: async (user, password) => {
    const loginData = {
      number_registration: user,
      password,
    };

    const response = await myAxios.post("user/login", loginData);
    return response.data;
  },

  // Função para NOTIFICAR A API sobre o logout
  logout: async () => {
    try {
      const token = getToken();

      if (token) {
        await myAxios.delete("user/logout", {
          headers: getAuthHeaders(),
        });
      }
    } catch (error) {
      console.error("Erro ao notificar API sobre logout:", error);
    }
  },
};

export default AuthService;