import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import DashboardService from '../services/DashboardService';

export default function useDashboard() {
    
  // Estados principais do hook
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os dados principais do dashboard (e atualizar o estado)
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

  // Função para buscar dados de gráfico por categoria (retorna dados, não muda estado)
  const fetchCategoryChartData = useCallback(async (categoryId, year) => {
    try {
      // Retorna os dados diretamente para o componente que chamou
      return await DashboardService.getDashboardData({ category: categoryId, year });
    } catch (err) {
      console.error("Erro ao carregar dados do gráfico de categoria:", err);
      toast.error('Erro ao carregar dados do gráfico.');
      return null; 
    }
  }, []);

  // Função para buscar dados de gráfico por produto (retorna dados, não muda estado)
  const fetchProductChartData = useCallback(async (productId, fromDate, toDate) => {
    try {
      return await DashboardService.getDashboardData({ product: productId, fromDate, toDate });
    } catch (err) {
      console.error("Erro ao carregar dados do gráfico de produto:", err);
      toast.error('Erro ao carregar dados do gráfico.');
      return null; 
    }
  }, []);

  // Função para buscar a projeção de vendas (retorna dados, não muda estado)
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

  // Efeito para carregar os dados principais na montagem do hook
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]); // Dependência correta

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