import { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductService from "../services/ProductService";

export default function useProduct(currentPage = 1, pageSize = 10) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [totalPages, setTotalPages] = useState(1);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  // Função para buscar e paginar os produtos
  const getAllProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {

      const responseData = await ProductService.getAll(currentPage, pageSize);

      const apiProductsArray = responseData?.data || [];
      const finalProducts = Array.isArray(apiProductsArray)
        ? apiProductsArray
        : [];

      setProducts(finalProducts);

      const total = responseData.total || responseData.meta?.total || 0;
      const lastPage =
        responseData.last_page || responseData.meta?.last_page || 1;

      setTotalProductsCount(total);
      setTotalPages(lastPage);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setError("Erro ao carregar produtos.");
      toast.error("Erro ao carregar produtos!");
      setProducts([]);
      setTotalProductsCount(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para apagar um produto
  const deleteProduct = async (id) => {
    try {
      await ProductService.remove(id);
      toast.success("Produto excluído com sucesso!");
      await getAllProducts();
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      toast.error("Erro ao excluir produto!");
    }
  };

  // Função para atualizar um produto
  const updateProduct = async (id, data) => {
    try {
      const updatedProduct = await ProductService.updateProduct(id, data);

      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );

      toast.success("Produto atualizado com sucesso!");

      return updatedProduct;
    } catch (error) {
      toast.error("Erro ao atualizar produto.");
      throw error;
    }
  };

  // Função para criar um novo produto
  const newProduct = async (data) => {
    try {
      const response = await ProductService.createProduct(data);
      toast.success("Produto criado com sucesso!");
      await getAllProducts();
      return response;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error("Erro ao criar produto.");
      throw error;
    }
  };

  // Efeito para carregar produtos quando a página ou o limite mudam
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