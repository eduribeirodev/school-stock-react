import DashboardHeader from "../../components/header/DashboardHeader";
import { TbPackage } from "react-icons/tb";
import HomeCard from "../../components/cards/HomeCard";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import GraphicCard from "../../components/graphic-card/GraphicCard";
import DashBoardTable from "../../components/tables/DashboardTable";
import useDashboard from "../../hooks/useDashboard"; 


export default function Home() {
    
    const { 
        dashboardData, 
        isLoading, 
        error, 
    } = useDashboard(); 

    const calculateTotal = (chartArray) => {
        if (!chartArray || !Array.isArray(chartArray)) return 0;
        return chartArray.reduce((sum, item) => sum + (parseInt(item.amountSold) || 0), 0);
    };

    const chartInfo = dashboardData?.charts || {};
    const productInfo = dashboardData?.productInfo || {};
    
    const mostSoldName = productInfo.mostSold?.productName || 'N/A';
    const leastSoldName = productInfo.leastSold?.productName || 'N/A';
    
    const totalSaidas = calculateTotal(chartInfo.productChart);
    
    const totalProdutosCadastrados = 0; 
    const estoqueTotalUnidades = 0; 
    const totalEntradas = 0; 


    if (isLoading) {
        return (
            <div className="bg-gray-100 min-h-screen p-10 flex justify-center items-center">
                <p className="text-xl font-medium text-gray-700">Carregando dados da Dashboard...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="bg-gray-100 min-h-screen p-10 text-center">
                <p className="text-xl font-bold text-red-600">Erro ao carregar Dashboard!</p>
                <p className="text-gray-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-2 space-y-10"> 
            
            <DashboardHeader
                title="Dashboard"
                SubTitle="Visão geral do estoque e vendas"
            />

            <div className=" flex gap-10 justify-center items-center "> 
                <HomeCard 
                    title="Total de Produtos" 
                    icon={TbPackage} 
                    quantidade={totalProdutosCadastrados} 
                    p1="Produtos cadastrados" 
                />
                <HomeCard 
                    title="Estoque Total" 
                    icon={TbPackage} 
                    quantidade={estoqueTotalUnidades} 
                    p1="Unidades em estoque" 
                />
                <HomeCard 
                    title="Mais Vendido" 
                    icon={IoIosTrendingUp} 
                    quantidade={mostSoldName} 
                    p1="Produto mais vendido" 
                />
                <HomeCard 
                    title="Saídas Totais" 
                    icon={IoIosTrendingDown} 
                    quantidade={totalSaidas} 
                    p1="Unidades vendidas" 
                />
            </div>
            
            <div > 
                <DashBoardTable 
                    productsData={chartInfo.productChart}
                    categoriesData={chartInfo.categoryChart} 
                /> 
            </div>

            <div className="mx-8 flex justify-around">
    <GraphicCard data={chartInfo.productChart} title="Vendas por Produto (Unidades)" />
    
    <GraphicCard data={chartInfo.categoryChart} title="Vendas por Categoria (Unidades)" />
</div>
        </div>
    );
}