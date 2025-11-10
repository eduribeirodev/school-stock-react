import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import DashboardService from '../services/DashboardService'; 

export default function useDashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = useCallback(async (params = {}) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await DashboardService.getDashboardData(params);
            
            setDashboardData(data);
            
        } catch (err) {
            console.error("Erro ao carregar dados da Dashboard:", err);
            setError('Falha ao carregar dados principais da Dashboard.');
            toast.error('Erro ao carregar Dashboard.');
        } finally {
            setIsLoading(false);
        }
    }, []);


    const fetchCategoryChartData = useCallback(async (categoryId, year) => {
        return DashboardService.getDashboardData({ category: categoryId, year }); 
    }, []);


    const fetchProductChartData = useCallback(async (productId, fromDate, toDate) => {
        return DashboardService.getDashboardData({ product: productId, fromDate, toDate }); 
    }, []);


    const fetchSaleProjection = useCallback(async (fromDate, toDate) => {
        try {
            const projection = await DashboardService.getSaleProjection(fromDate, toDate);
            return projection;
        } catch (err) {
            console.error("Erro ao carregar projeção de vendas:", err);
            toast.error('Erro ao carregar projeção de vendas.');
            return [];
        }
    }, []);


    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return { 
        dashboardData, 
        isLoading, 
        error, 
        fetchDashboardData,
        fetchCategoryChartData, 
        fetchProductChartData,  
        fetchSaleProjection,    
    };
}