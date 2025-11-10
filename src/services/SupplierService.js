import myAxios from "../api/axiosInstance";

const SupplierService = {

    getAll: async () => {
        const token = localStorage.getItem("token");
        const response = await myAxios.get("/supplier", {
            headers: { Authorization: `Bearer ${token}`},
        });
        return response.data.data;
    },

    create: async(data) => {
        const token = localStorage.getItem("token");
        const response = await myAxios.post("/supplier/store", data, {
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
        const response = await myAxios.delete(`/supplier/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        return response.data;
    },
    show: async (id) => { 
        const token = localStorage.getItem("token");
        const response = await myAxios.get(`/supplier/${id}`, {
            headers: { Authorization: `Bearer ${token}`},
        });
        return response.data; 
    },
    
    update: async (id, { name, contact }) => { 
        const token = localStorage.getItem("token");
        
        const dataToSend = {
            name, 
            contact,
            _method: 'PUT', 
        };

        const response = await myAxios.post( 
            `/supplier/${id}`,
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

};

export default SupplierService;