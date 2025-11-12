import { useState, useEffect } from "react";
import { toast } from "sonner";
import CategoryService from "../services/CategoryService";

export default function useCategory() {

  // Estado para armazenar a lista de categorias
  const [categories, setCategories] = useState([]);

  // Estado para feedback de carregamento
  const [isLoading, setIsLoading] = useState(false);

  // Estado para feedback de erro
  const [error, setError] = useState(null);

  // Função para buscar todas as categorias
  const getAllCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // O serviço já retorna o array de dados
      const data = await CategoryService.getAll();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
      setError("Erro ao carregar categorias.");
      toast.error("Erro ao carregar categorias!");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para criar uma nova categoria
  const newCategory = async (data) => {
    try {
      const createdCategory = await CategoryService.create(data);
      setCategories((prevCategories) => [...prevCategories, createdCategory]);
      toast.success("Categoria criada com sucesso!");
      return createdCategory;
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      toast.error("Erro ao criar categoria!");
      throw error;
    }
  };

  // Função para apagar uma categoria
  const deleteCategory = async (id) => {
    try {
      await CategoryService.remove(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
      toast.success("Categoria excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      toast.error("Erro ao excluir categoria!");
    }
  };

  // Função para atualizar uma categoria
  const updateCategory = async (id, data) => {
    try {
      const updatedCategory = await CategoryService.update(id, data);
      setCategories((prev) =>
        prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
      );
      return updatedCategory;
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      toast.error("Erro ao atualizar categoria!");
      throw error;
    }
  };

  // Efeito para carregar as categorias quando o hook é montado
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