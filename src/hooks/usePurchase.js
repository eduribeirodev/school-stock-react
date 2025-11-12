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

    // Função para centralizar o tratamento de erros
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

    // Função para buscar o histórico de compras (paginado)
    const fetchPurchases = async (pageToFetch = currentPage) => {
        setIsLoading(true);
        setError(null);

        try {
    
            const response = await PurchaseService.list(pageToFetch); 
            
            
            const responseData = response.data?.data || response.data;

            
            const purchasesArray = responseData?.data || responseData || [];

            
            setPurchases(Array.isArray(purchasesArray) ? purchasesArray : []); 
            setTotalPurchasesCount(responseData?.total || 0);
            setTotalPages(responseData?.last_page || 1);
            
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
    
    // Função para registrar uma nova compra
    const registerPurchase = async (purchaseData) => {
        try {
            const response = await PurchaseService.register(purchaseData);
            toast.success("Compra registrada com sucesso!");
            
            if (currentPage !== 1) {
                setCurrentPage(1); 
            } else {
                await fetchPurchases(1); 
            }
            return response;
        } catch (error) {
            handleError(error, "Erro desconhecido ao registrar a compra.");
        }
    };
    
    // Função para apagar uma compra
    const deletePurchase = async (id) => {
        try {
            const response = await PurchaseService.remove(id);
            toast.success(`Compra #${id} excluída com sucesso!`);
            await fetchPurchases(currentPage); 
            return response;
        } catch (error) {
            handleError(error, `Falha ao excluir compra #${id}.`);
        }
    };

    // Efeito para carregar dados quando a página muda
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