import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import SaleService from '../services/SaleService';

export default function useFetchSales() {
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalSalesCount, setTotalSalesCount] = useState(0);

    const fetchSales = async (pageToFetch = currentPage) => {
        setIsLoading(true);
        setError(null);
        try {
   
            const responseData = await SaleService.list(pageToFetch);

           
            const apiData = responseData?.data;
            const salesArray = apiData?.data || [];

            setSales(Array.isArray(salesArray) ? salesArray : []);
            setTotalSalesCount(responseData?.total || 0); 
            setTotalPages(apiData?.last_page || 1);

        } catch (err) {
            console.error("Erro ao carregar histórico de vendas:", err);

            if (err.response && err.response.status === 404) {
                setSales([]);
                setTotalSalesCount(0);
                toast.info("Nenhuma venda encontrada.");
            } else {
                setError('Falha ao carregar o histórico de saídas.');
                
                toast.error('Erro ao carregar histórico de vendas.'); 
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSales(currentPage);
    }, [currentPage]);

    return {
        sales,
        isLoading,
        error,
        currentPage,
        totalPages,
        totalSalesCount,
        onPageChange: setCurrentPage,
        refetch: () => fetchSales(currentPage),
    };
}