import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import PurchaseService from '../services/PurchaseService'; 

export default function usePurchase() {
    const [purchases, setPurchases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1);
    const [totalPurchasesCount, setTotalPurchasesCount] = useState(0); 

    const handleError = (error, defaultMessage) => {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(`Falha: ${error.response.data.message}`);
            console.error("ERRO DE VALIDAÇÃO/API:", error.response.data);
        } else {
            toast.error(defaultMessage);
            console.error("ERRO DE REDE/CÓDIGO:", error);
        }
        throw error; 
    };

   
    const fetchPurchases = async (pageToFetch = currentPage) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await PurchaseService.list(pageToFetch); 
            
            
            const apiData = response.data?.data; 
            const purchasesArray = apiData?.data || apiData || []; 

            setPurchases(Array.isArray(purchasesArray) ? purchasesArray : []); 
            
          
            const paginationInfo = response.data?.data || response.data;
            setTotalPurchasesCount(paginationInfo?.total || 0);
            setTotalPages(paginationInfo?.last_page || 1);
            
        } catch (err) {
            console.error("Erro ao carregar histórico de compras:", err);
            if (err.response && (err.response.status === 404 || err.response.status === 204)) {
                 setPurchases([]);
                 setTotalPurchasesCount(0);
                 toast.info("Nenhuma compra encontrada.");
            } else {
                 setError('Falha ao carregar o histórico de compras.');
                 toast.error('Erro ao carregar histórico de compras.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const registerPurchase = async (purchaseData) => {
        try {
            const response = await PurchaseService.register(purchaseData);
            toast.success("Compra registrada com sucesso!");
            return response;
        } catch (error) {
            handleError(error, "Erro desconhecido ao registrar a compra.");
        }
    };
    
    const deletePurchase = async (id) => {
        try {
            const response = await PurchaseService.remove(id);
            toast.success(`Compra #${id} excluída com sucesso!`);
            return response;
        } catch (error) {
            handleError(error, `Falha ao excluir compra #${id}.`);
        }
    };


    useEffect(() => {
        fetchPurchases(currentPage);
    }, [currentPage]);

    return { 
        purchases, 
        isLoading, 
        error, 
        
        currentPage,
        totalPages,
        totalPurchasesCount,
        onPageChange: setCurrentPage,
        
        registerPurchase,
        deletePurchase,
        refetchPurchases: () => fetchPurchases(currentPage),
    };
}