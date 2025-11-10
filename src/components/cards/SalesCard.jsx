
import { ShoppingCart } from 'lucide-react'; 
import { toast } from 'sonner';



export default function SalesCard({ category, productName, price, stock, onAddClick, categoryHex }) { 
    
    const formattedHex = categoryHex ? `#${categoryHex.replace('#', '')}` : '#6b7280'; 

    return (
        <div className="border border-gray-200 rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-all w-full max-w-60">
            
            <div className="relative bg-gray-100 h-16 flex items-center p-3">
                
                <div 
                    style={{ backgroundColor: formattedHex }} 
                    className={`px-3 py-1 text-white text-xs font-semibold rounded-full`}
                >
                    {category}
                </div>
            </div>

            <div className="p-3">
                <h3 className="text-base font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis mb-2">
                    {productName}
                </h3>

                <div className="flex justify-between items-center mb-3">
                    <p className="text-lg font-bold text-red-600">{price}</p> 
                </div>

                <button
                    onClick={() => {
                        onAddClick(); 
                        toast.success("Item adicionado no carrinho com sucesso"); 
                    }}
                    className="w-full flex items-center justify-center px-3 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition-colors"
                >
                    <ShoppingCart size={16} className="mr-2" />
                    Adicionar
                </button>
            </div>
        </div>
    );
}