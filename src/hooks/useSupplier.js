import { useState, useEffect } from "react";
import { toast } from "sonner";
import SupplierService from "../services/SupplierService";

export default function useSupplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar todos os fornecedores
  const getAllSuppliers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      
      const response = await SupplierService.getAll();
      
      setSuppliers(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Erro ao buscar fornecedores:", err);
      setError("Erro ao carregar fornecedores.");
      toast.error("Erro ao carregar fornecedores!");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para criar um novo fornecedor
  const newSupplier = async (data) => {
    try {
      const newSupplierData = await SupplierService.create(data);
      toast.success("Fornecedor criado com sucesso!");
      setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplierData]);
      return newSupplierData;
    } catch (error) {
      console.error("Erro ao criar fornecedor:", error);
      toast.error("Erro ao criar fornecedor!");
      throw error;
    }
  };

  // Função para apagar um fornecedor
  const deleteSupplier = async (id) => {
    try {
      await SupplierService.remove(id);
      toast.success("Fornecedor excluído com sucesso!");
      setSuppliers((prevSuppliers) =>
        prevSuppliers.filter((supplier) => supplier.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
      toast.error("Erro ao excluir fornecedor!");
    }
  };

  // Função para atualizar um fornecedor
  const updateSupplier = async (id, data) => {
    try {
      const updatedSupplier = await SupplierService.update(id, data);
      setSuppliers((prev) =>
        prev.map((s) => (s.id === updatedSupplier.id ? updatedSupplier : s))
      );
      toast.success("Fornecedor atualizado com sucesso!");
      return updatedSupplier;
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      toast.error("Erro ao atualizar fornecedor!");
      throw error;
    }
  };

  // Função para buscar o nome de um fornecedor pelo ID (localmente)
  const getSupplierNameById = (id) => {
    if (!id) return "N/A";
    const supplier = suppliers.find((s) => String(s.id) === String(id));
    return supplier ? supplier.name : `ID: ${id}`;
  };

  // Função para buscar dados de um fornecedor específico pela API
  const fetchSupplierById = async (id) => {
    if (!id) return null;
    try {
      const supplier = await SupplierService.show(id);
      return supplier;
    } catch (err) {
      console.error(`Erro ao buscar fornecedor #${id}:`, err);
      toast.error(`Falha ao carregar fornecedor ID ${id}.`);
      return null;
    }
  };

  // Efeito para carregar os fornecedores na montagem do hook
  useEffect(() => {
    getAllSuppliers();
  }, []); 

  return {
    suppliers,
    isLoading,
    error,
    getSupplierNameById,
    fetchSupplierById,
    newSupplier,
    deleteSupplier,
    updateSupplier,
    getAllSuppliers, 
  };
}