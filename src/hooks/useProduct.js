import { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductService from "../services/ProductService";

export default function useProduct(currentPage = 1, pageSize = 10) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [totalPages, setTotalPages] = useState(1);
    const [totalProductsCount, setTotalProductsCount] = useState(0); 

    const getAllProducts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await ProductService.getAll(currentPage, pageSize);
            
            
            const apiProductsArray = response?.data?.data || response?.data || [];
            
            const finalProducts = Array.isArray(apiProductsArray) ? apiProductsArray : [];
            
            if (response && response.data) { 
                setProducts(finalProducts); 
                
                const paginationInfo = response.data;
                
                const total = paginationInfo.total || 
                              paginationInfo.meta?.total || 
                              0;

                const lastPage = paginationInfo.last_page || 
                                 paginationInfo.meta?.last_page ||
                                 1;
                
                setTotalProductsCount(total); 
                setTotalPages(lastPage); 
            } else {
                setProducts([]);
                setTotalProductsCount(0);
                setTotalPages(1);
            }

        } catch (err) {
            console.error("Erro ao buscar produtos:", err);
            setError("Erro ao carregar produtos.");
            toast.error("Erro ao carregar produtos!");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await ProductService.remove(id);
            await getAllProducts(); 
        } catch (err) {
            console.error("Erro ao excluir produto:", err);
            toast.error("Erro ao excluir produto!");
        }
    };

    const updateProduct = async (id, data) => {
        try {
            const updatedProduct = await ProductService.updateProduct(id, data);
            setProducts((prev) =>
                prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
            );
            window.location.reload();
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    };

    const newProduct = async (data) => {
        try {
            const response = await ProductService.createProduct(data);
            await getAllProducts(); 
            return response;
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            throw error;
        }
    };

    useEffect(() => {
        getAllProducts();
    }, [currentPage, pageSize]); 

    return {
        products,
        isLoading,
        error,
        totalPages, 
        totalProductsCount, 
        
        refetchProducts: getAllProducts, 
        deleteProduct,
        updateProduct,
        newProduct,
    };
}