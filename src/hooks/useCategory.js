import { useState, useEffect } from "react";
import { toast } from "sonner";
import CategoryService from "../services/CategoryService";

export default function useCategory (){

    const [categories, setCategories] = useState ([]);
    const [isLoading, setIsLoading] = useState (false);
    const [error, setError] = useState (null);


    const getAllCategories = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await CategoryService.getAll(); 

            if (response){
                setCategories(response || []); 
            }else {
                setCategories([]);
            }
        }catch (err) {
            console.error("Erro ao buscar categorias:", err);
            setError("Erro ao carregar categorias.");
            toast.error("Erro ao carregar categorias!");
        } finally {
            setIsLoading(false); 
        }
    };
    
    const newCategory = async (data) => {
        try {
            const response = await CategoryService.create(data);
            toast.success("categoria criado com sucesso!");
            await getAllCategories(); 
            return response;
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            toast.error("Erro ao criar categoria!");
            throw error;
        }
    };
    
    const deleteCategory = async (id) => {
        try {
            await CategoryService.remove(id);
            toast.success("categoria excluído com sucesso!");
            await getAllCategories(); 
        } catch (error) {
            console.error("Erro ao excluir categoria:", error);
            toast.error("Erro ao excluir categoria!");
        }
    };

    const updateCategory = async (id, data) => {
    try {
      const updateCategory = await CategoryService.update(id, data);
      setCategories((prev) =>
        prev.map((u) => (u.id === updateCategory.id ? updateCategory : u))
      );
      return updateCategory;
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      toast.error("Erro ao atualizar categoria!");
      throw error;
    }
  };

    useEffect(() => {
        getAllCategories();
    }, []); 

    return {
        categories,
        isLoading,
        error,
        
        newCategory,
        deleteCategory,
        updateCategory,
        getAllCategories,
    };

}