import myAxios from "../api/axiosInstance";

const CategoryService = {

    getAll: async () => {
        const token = localStorage.getItem("token");
        const response = await myAxios.get("/category", {
            headers: { Authorization: `Bearer ${token}`},
        });
        return response.data.data;
    },

    create: async(data) => {
        const token = localStorage.getItem("token");
        const response = await myAxios.post("/category/store", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        return response.data;
    },

    remove: async (id) => {
        const token = localStorage.getItem("token");
        const response = await myAxios.delete(`/category/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        return response.data;
    },
    
    update: async (id, { name, color }) => { 
        const token = localStorage.getItem("token");
        
        const dataToSend = {
            name, 
            color,
            _method: 'PUT', 
        };

        const response = await myAxios.post( 
            `/category/${id}`,
            dataToSend, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json", 
                },
            }
        );

        return response.data.data; 
    },

    show: async (id) => {
        const token = localStorage.getItem("token");
        const response = await myAxios.get(`/category/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        return response.data.data;
    },
    

};

export default CategoryService;