// src/services/AuthService.js

import myAxios from "../api/axiosInstance";

const AuthService = {
  login: async (user, password) => {
    const loginData = {
      number_registration: user,
      password: password,
    };

    const response = await myAxios.post("user/login", loginData);
    return response.data;
  },

  logout: async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await myAxios.delete("user/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
