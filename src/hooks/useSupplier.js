import { useState, useEffect } from "react";
import { toast } from "sonner";
import SupplierService from "../services/SupplierService";

export default function useSupplier (){

    const [suppliers, setSuppliers] = useState ([]);
    const [isLoading, setIsLoading] = useState (false);
    const [error, setError] = useState (null);


    const getAllSuppliers = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await SupplierService.getAll(); 
            
            if (response){
                setSuppliers(response || []); 
            }else {
                setSuppliers([]);
            }
        }catch (err) {
            console.error("Erro ao buscar fornecedores:", err);
            setError("Erro ao carregar fornecedores.");
            toast.error("Erro ao carregar fornecedores!");
        } finally {
            setIsLoading(false); 
        }
    };
    
    const newSupplier = async (data) => {
        try {
            const response = await SupplierService.create(data);
            toast.success("Fornecedor criado com sucesso!");
            await getAllSuppliers(); 
            return response;
        } catch (error) {
            console.error("Erro ao criar fornecedor:", error);
            toast.error("Erro ao criar fornecedor!");
            throw error;
        }
    };
    
    const deleteSupplier = async (id) => {
        try {
            await SupplierService.remove(id);
            toast.success("Fornecedor excluído com sucesso!");
            await getAllSuppliers(); 
        } catch (error) {
            console.error("Erro ao excluir fornecedor:", error);
            toast.error("Erro ao excluir fornecedor!");
        }
    };

    const updateSupplier = async (id, data) => {
        try {
          const updatedSupplier = await SupplierService.update(id, data);
          setSuppliers((prev) =>
            prev.map((s) => (s.id === updatedSupplier.id ? updatedSupplier : s))
          );
          return updatedSupplier;
        } catch (error) {
          console.error("Erro ao atualizar fornecedor:", error);
          toast.error("Erro ao atualizar fornecedor!");
          throw error;
        }
    };

    const getSupplierNameById = (id) => {
        if (!id) return 'N/A';
        const supplier = suppliers.find(s => String(s.id) === String(id));
        return supplier ? supplier.name : `ID: ${id}`;
    };

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