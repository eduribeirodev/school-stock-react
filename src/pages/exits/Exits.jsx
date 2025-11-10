import { FaPlus } from "react-icons/fa"; 
import { useState } from "react";
import { toast } from "sonner"; 

import useAuth from "../../hooks/useAuth"; 
import useSale from "../../hooks/useSale"; 
import useFetchSales from "../../hooks/useFetchSales"; 
import useProduct from "../../hooks/useProduct"; 

import Header from "../../components/header/Header";
import ExitsTable from "../../components/tables/ExitsTable";
import ExitModal from "../../components/modals/ExitModal";
import ExitEditModal from "../../components/modals/EditExitModal"

export default function Exits() {
    const { logout } = useAuth() || {}; 
    
    const [ isModalOpen, setIsModalOpen] = useState(false);
    const [ isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [ editingExit, setEditingExit] = useState(null); 
    
    const { products: allProducts, refetch: refetchProducts } = useProduct(1, 1000) || {}; 
    
    const { 
        sales: exits, 
        isLoading, 
        error, 
        refetch: refetchExits,
        currentPage,
        totalPages,
        totalSalesCount,
        onPageChange 
    } = useFetchSales() || {}; 

    const { checkoutSale, updateSale } = useSale() || {}; 

    const productsArray = allProducts?.data || allProducts || []; 


    const handlePageChange = (newPage) => {
        if (onPageChange && newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };
    
    const handleEditClick = (exitData) => {
        setEditingExit(exitData); 
        setIsEditModalOpen(true);
    };

    const handleSuccessfulAction = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);
        setEditingExit(null);
        
        refetchExits();
        if (refetchProducts) {
             refetchProducts();
        }
    };

    const handleNewExitSubmit = async (saleData) => {
        try {
            await checkoutSale(saleData); 
            handleSuccessfulAction();
        } catch (e) {
        }
    };

    const handleEditExitSubmit = async (saleData, id) => {
        try {
            await updateSale(id, saleData); 
            handleSuccessfulAction();
        } catch (e) {
        }
    };
    
    return (
        <div className="bg-gray-100 min-h-screen p-2 space-y-10 items"> 
            
            <Header
                title="Saídas de Produtos"
                SubTitle={`Histórico de Vendas (Total: ${totalSalesCount || 0})`}
                titleButton="Nova Saída"
                iconButton={FaPlus}
                functionButton={() => setIsModalOpen(true)}
            />
            
            <div className="max-w-6xl mx-auto">
                
                {isLoading && <p className="text-center text-gray-600 mt-8">Carregando histórico de saídas...</p>}
                {error && <p className="text-center text-red-600 mt-8">{error}</p>}
                
                {!isLoading && !error && (
                    <ExitsTable 
                        exits={exits} 
                        onEdit={handleEditClick} 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}

                <ExitModal 
                    isOpen={isModalOpen} 
                    onClose={() => handleSuccessfulAction()}
                    products={productsArray} 
                    onSubmit={handleNewExitSubmit}
                />

                {/* <ExitEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => handleSuccessfulAction()}
                    products={productsArray} 
                    initialData={editingExit} 
                    onSubmit={handleEditExitSubmit}
                /> */}
            </div>
        </div>
    );
}