
import myAxios from "../api/axiosInstance";

const UserService = {

  
  getAll: async (page = 1, limit = 10) => { 
    const token = localStorage.getItem("token");
    const response = await myAxios.get("/user", {
      headers: { Authorization: `Bearer ${token}` },
      params: { 
          page: page,
          limit: limit 
      }
    });
    return response.data.data;
  },

  remove: async (id) => {
    const token = localStorage.getItem("token");
    const response = await myAxios.delete(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  },

  updateUser: async (id, { name, number_registration }) => {
    const token = localStorage.getItem("token");
    const response = await myAxios.put(
      `/user/${id}`,
      { name, number_registration },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data.user ?? response.data;
  },

    updatePassword: async (id, data) => {
        const token = localStorage.getItem("token");
        
        const response = await myAxios.put(`/password/${id}`, data, {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
        });
        
        return response.data; 
    },

    createUser: async(data) => {

        const token = localStorage.getItem("token");
        const response = await myAxios.post("user/store", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        return response.data;
    }
};

export default UserService;