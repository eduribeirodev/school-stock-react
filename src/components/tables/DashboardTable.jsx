
import { AlertTriangle } from "lucide-react";


export default function DashBoardTable({ alerts = [] }) {
    
    const alertsCount = alerts.length;
    const getColorClass = (type) => {
        switch (type) {
            case 'critical':
                return 'text-red-600 border-red-600';
            case 'low':
                return 'text-yellow-600 border-yellow-600';
            default:
                return 'text-gray-500 border-gray-200';
        }
    };
    
    const getBadgeClass = (type) => {
        switch (type) {
            case 'critical':
                return 'bg-red-600';
            case 'low':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
   
        <div>
           
            <h2 className="text-xl font-semibold mb-4">Alertas de Estoque ({alertsCount})</h2>

            {alertsCount === 0 ? (
                <p className="text-gray-500 text-center py-6  rounded-lg bg-white/80 shadow-xl ">
                    Nenhum alerta de estoque ativo no momento.
                </p>
            ) : (
                
                
                <div className="space-y-4">
                    
                    
                    {alerts.map((alert) => {
                        const colorClass = getColorClass(alert.type);
                        const badgeClass = getBadgeClass(alert.type);

                        return (
                            <div 
                                key={alert.id}
                             
                                className="p-4 bg-white rounded-2xl shadow-lg border border-gray-200 flex items-center justify-between transition-shadow hover:shadow-xl"
                            >
                                
                                
                                <div className="flex items-start">
                                    
                                  
                                    <AlertTriangle 
                                        size={20}
                                      
                                        className={`mr-3 mt-1 ${colorClass}`} 
                                    />
                                    
                                    
                                    <div>
                                       
                                        <p className={`font-semibold ${colorClass}`}>
                                            {alert.title}
                                        </p>
                                     
                                        <p className="text-gray-600 text-sm">
                                            **{alert.productName}** - Quantidade: **{alert.quantity}** {alert.unit} (Mínimo: **{alert.minStock}**)
                                        </p>
                                    </div>
                                </div>

                                
                                <div>
                                    <span className={`${badgeClass} text-white text-xs font-semibold px-3 py-1 rounded-full uppercase`}>
                                        {alert.type === 'critical' ? 'Crítico' : 'Baixo'}
                                    </span>
                                </div>

                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}