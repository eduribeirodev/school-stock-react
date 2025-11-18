import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
// Importação do serviço. Assumimos que o método DashboardService.getStockAlerts existe.
import DashboardService from '../services/DashboardService'; 

export default function useDashboard() {
    
  // Estados principais do hook
  const [dashboardData, setDashboardData] = useState(null);
  // NOVO ESTADO: Armazena a lista de alertas de estoque
  const [stockAlerts, setStockAlerts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Função para buscar os dados principais do dashboard (e atualizar o estado)
  const fetchDashboardData = useCallback(async (params = {}) => {
    // Remove a gestão de loading e error daqui, será feita no loadData do useEffect
    try {
      const data = await DashboardService.getDashboardData(params);
      setDashboardData(data);
    } catch (err) {
      console.error("Erro ao carregar dados da Dashboard:", err);
      setError('Falha ao carregar dados principais da Dashboard.');
    }
    // Não fazemos setIsLoading(false) aqui
  }, []); 

  // 2. NOVO: Função para buscar os alertas de estoque (e atualizar o estado)
  const fetchStockAlerts = useCallback(async () => {
    try {
      // Chamamos o serviço para obter os alertas
      const alerts = await DashboardService.getStockAlerts();
      setStockAlerts(alerts);
    } catch (err) {
      console.error("Erro ao carregar alertas de estoque:", err);
      setStockAlerts([]); // Define como vazio em caso de erro
    }
  }, []);

  // 3. FUNÇÃO REINTRODUZIDA: Busca dados de gráfico por categoria
  const fetchCategoryChartData = useCallback(async (categoryId, year) => {
    try {
      // Retorna os dados diretamente para o componente que chamou
      return await DashboardService.getDashboardData({ category: categoryId, year });
    } catch (err) {
      console.error("Erro ao carregar dados do gráfico de categoria:", err);
      toast.error('Erro ao carregar dados do gráfico de Categoria.');
      return null; 
    }
  }, []);

  // 4. FUNÇÃO REINTRODUZIDA: Busca dados de gráfico por produto
  const fetchProductChartData = useCallback(async (productId, fromDate, toDate) => {
    try {
      return await DashboardService.getDashboardData({ product: productId, fromDate, toDate });
    } catch (err) {
      console.error("Erro ao carregar dados do gráfico de produto:", err);
      toast.error('Erro ao carregar dados do gráfico de Produto.');
      return null; 
    }
  }, []);

  // 5. FUNÇÃO REINTRODUZIDA: Busca a projeção de vendas
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


  // Efeito para carregar os dados principais e os alertas na montagem do hook
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Executa as duas buscas iniciais em paralelo para melhor performance
      await Promise.all([
        fetchDashboardData(),
        fetchStockAlerts() 
      ]);
      setIsLoading(false);
    };
    loadData();
  }, [fetchDashboardData, fetchStockAlerts]); 

  return {
    dashboardData,
    stockAlerts, 
    isLoading,
    error,
    fetchDashboardData,
    fetchCategoryChartData,
    fetchProductChartData,
    fetchSaleProjection,
  };
}