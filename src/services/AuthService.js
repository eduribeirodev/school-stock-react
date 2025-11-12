import myAxios from "../api/axiosInstance";

// Helper para obter o token
const getToken = () => localStorage.getItem("token");

// Helper para headers de autenticação (usado para GET, DELETE)
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  // Adicionando 'Accept' para consistência com os outros serviços
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

  // Função para deslogar da aplicação
  logout: async () => {
    try {
      const token = getToken();

      if (token) {
        await myAxios.delete("user/logout", {
          headers: getAuthHeaders(), 
        });
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      localStorage.clear();
      window.location.href = "/";
    }
  },
};

export default AuthService;