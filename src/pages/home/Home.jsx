import DashboardHeader from "../../components/header/DashboardHeader";
import { TbPackage } from "react-icons/tb";
import HomeCard from "../../components/cards/HomeCard";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import GraphicCard from "../../components/graphic-card/GraphicCard";
import DashBoardTable from "../../components/tables/DashboardTable";
import useDashboard from "../../hooks/useDashboard";

export default function Home() {
  const { dashboardData, isLoading, error } = useDashboard();

  // Função auxiliar — calcula total de saídas
  const calculateTotal = (chartArray = []) => {
    return chartArray.reduce((sum, item) => sum + (parseInt(item.amountSold) || 0), 0);
  };

  // Dados do dashboard
  const chartInfo = dashboardData?.charts || {};
  const productInfo = dashboardData?.productInfo || {};

  const mostSold = productInfo.mostSold?.productName || "N/A";
  const leastSold = productInfo.leastSold?.productName || "N/A";
  const totalSaidas = calculateTotal(chartInfo.productChart);

  // Simulação de alertas — depois você pode trocar pra vir da API
  const alerts = [
    {
      id: 1,
      title: "Estoque crítico",
      productName: "Folha A4 pacote",
      quantity: 2,
      unit: "un",
      minStock: 5,
      type: "critical",
    },
    {
      id: 2,
      title: "Estoque baixo",
      productName: "Coxinha de Frango",
      quantity: 6,
      unit: "un",
      minStock: 10,
      type: "low",
    },
  ];

  // Estados de carregamento e erro
  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <p className="text-lg font-medium text-gray-700">
          Carregando dados da Dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <p className="text-xl font-bold text-red-600">Erro ao carregar Dashboard!</p>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  // Layout principal
  return (
    <div className="bg-gray-100 min-h-screen p-6 space-y-10">
      {/* Cabeçalho */}
      <DashboardHeader
        title="Dashboard"
        SubTitle="Visão geral do estoque e vendas"
      />

      {/* Cards de resumo */}
      <div className="flex flex-wrap justify-center gap-8">
        <HomeCard
          title="Mais Vendido"
          icon={IoIosTrendingUp}
          quantidade={mostSold}
          p1="Produto mais vendido"
        />
        <HomeCard
          title="Menos Vendido"
          icon={IoIosTrendingDown}
          quantidade={leastSold}
          p1="Produto com menor saída"
        />
        <HomeCard
          title="Saídas Totais"
          icon={TbPackage}
          quantidade={totalSaidas}
          p1="Unidades vendidas"
        />
      </div>

      {/* Alertas de estoque */}
      <section className="mx-auto max-w-5xl">
        <DashBoardTable alerts={alerts} />
      </section>

        {/* Gráficos */}
<section className="flex flex-wrap justify-center items-center gap-10 mt-10">
  <GraphicCard
    data={chartInfo.productChart}
    title="Vendas por Produto (Unidades)"
  />
  <GraphicCard
    data={chartInfo.categoryChart}
    title="Vendas por Categoria (Unidades)"
  />
</section>

  
    </div>
  );
}
