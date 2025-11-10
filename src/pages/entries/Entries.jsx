import { FaPlus } from "react-icons/fa";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";
import usePurchase from "../../hooks/usePurchase"; 
import useProduct from "../../hooks/useProduct"; 
import useSupplier from "../../hooks/useSupplier"; 

import Header from "../../components/header/Header";
import EntriesTable from "../../components/tables/EntriesTable";
import EntrieModal from "../../components/modals/EntrieModal"; 

export default function Entries() {
    const { logout } = useAuth() || {};
    const [ isModalOpen, setIsModalOpen] = useState(false);
    
    const { 
        purchases, isLoading, error, refetchPurchases, 
        currentPage, totalPages, onPageChange, registerPurchase, deletePurchase
    } = usePurchase() || {}; 

    const { products: allProducts, refetch: refetchProducts } = useProduct(1, 1000) || {}; 
    const productsArray = allProducts?.data?.data || allProducts || [];
    
    
    const { 
        suppliers: suppliersArray, 
        isLoadingSuppliers,
        getSupplierNameById 
    } = useSupplier() || {};


    const handleNewEntrieSubmit = async (purchaseData) => {
        try {
            await registerPurchase(purchaseData);
            
            refetchPurchases();
            if (refetchProducts) {
                refetchProducts();
            }
        } catch (e) {}
    };
    
    const handleDeletePurchase = async (id) => {
       
            await deletePurchase(id);
            refetchPurchases();
            if (refetchProducts) {
                refetchProducts();
            }
        
    };


    return (
        <div className="bg-gray-100 min-h-screen p-2 space-y-10"> 
            
            <Header
                title="Entradas de Produtos"
                SubTitle="Registre o consumo e distribuição de produtos"
                titleButton="Nova Entrada"
                iconButton={FaPlus}
                functionButton={() => setIsModalOpen(true)}
            />
            
            <div className="max-w-6xl mx-auto">
                
                {isLoadingSuppliers && <p className="text-center text-gray-600">Carregando lista de fornecedores...</p>}
                {isLoading && <p className="text-center text-gray-600 mt-8">Carregando histórico...</p>}
                {error && <p className="text-center text-red-600 mt-8">{error}</p>}

                {!isLoading && !error && (
                    <EntriesTable
                        compras={purchases} 
                        onDelete={handleDeletePurchase}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        getSupplierName={getSupplierNameById} 
                    />
                )}
                
                <EntrieModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                    products={productsArray} 
                    suppliers={suppliersArray} 
                    onSubmit={handleNewEntrieSubmit}
                />
            </div>
        </div>
    );
}