import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Constante para definir o limite de itens a serem exibidos.
const MAX_ITEMS = 3;

export default function GraphicCard({ data = [], title = "Gráfico de Vendas", titleTable  }) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const rawFormattedData = data.map(item => {
        const nameKey = item.product_name || item.category_name;
        
        return {
            name: nameKey,
            valor: parseFloat(item.amountSold) || 0,
            color: item.color ? `#${item.color}` : '#3B82F6', 
        };
    });

    const sortedData = rawFormattedData.sort((a, b) => b.valor - a.valor);

    const formattedData = sortedData.slice(0, MAX_ITEMS);

    useEffect(() => {
        const updateDimensions = () => {
            setTimeout(() => {
                setDimensions({
                    width: window.innerWidth * 0.4,
                    height: 300, 
                });
            }, 50); 
        };

        updateDimensions();

        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []); 

    const CustomTooltip = ({ active, payload, label}) => {
        if (active && payload && payload.length) {
            return (
                <div className="p-2 bg-white border border-gray-300 rounded-md shadow-lg text-sm">
                    <p className="font-semibold text-gray-800">{label}</p>
                    <p className="text-gray-600">{`${payload[0].name}: ${payload[0].value} unidades`}</p>
                </div>
            );
        }
        return null;
    };

    return (
  <div
    className="relative flex flex-col p-4 bg-white/80 rounded-xl shadow-xl transition-shadow hover:shadow-2xl"
    style={{ width: "40%", height: "400px", minWidth: "350px" }}
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{title}</h3>

    {formattedData.length > 0 ? (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="name" angle={0} textAnchor="middle" height={50} stroke="#6B7280" interval={0} style={{ fontSize: '14px' }} />
          <YAxis stroke="#6B7280" axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '18px', alignItems: "center", marginLeft: "22px" }} />
          <Bar dataKey="valor" name={`${titleTable}`} fill="#c41414" />
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          Nenhum dado disponível.
        </div>
      </div>
    )}
  </div>
);
    
}