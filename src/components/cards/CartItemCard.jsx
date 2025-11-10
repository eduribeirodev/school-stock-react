import { LuPackage, LuX } from 'react-icons/lu'; 

export default function CartItemCard({ 
    id, 
    name, 
    price, 
    quantity, 
    category, 
    categoryHexColor, 
    onRemove,
    onIncrement, 
    onDecrement 
}) {
    
    const formattedHex = categoryHexColor ? `#${categoryHexColor.replace('#', '')}` : '#808080';
    
    const formattedPrice = `R$ ${parseFloat(price).toFixed(2)}`;
    const formattedSubtotal = `R$ ${(price * quantity).toFixed(2)}`;
    
    const renderCategoryBadge = () => {
        return (
             <div 
                 style={{ backgroundColor: formattedHex }} 
                 className="px-2 py-0.5 text-white text-xs font-medium rounded-md"
             >
                 {category}
             </div>
        );
    };

    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-start space-x-3 flex-1 min-w-0">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 shrink-0">
                    <LuPackage size={24} className="text-gray-500" />
                </div>
                
                <div className="flex flex-col space-y-1">
                    <h4 className="font-semibold text-gray-800 truncate">{name}</h4>
                    {renderCategoryBadge()}
                </div>
            </div>

            <div className="flex items-center space-x-4 shrink-0">
                <div className="flex items-center border border-gray-300 rounded-md">
                </div>
                
                <p className="font-bold text-red-600 text-base w-16 text-right hidden sm:block">
                    {formattedSubtotal}
                </p>
                
                <button 
                    onClick={() => onRemove(id)} 
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                    aria-label={`Remover ${name}`}
                >
                    <LuX size={16} /> 
                </button>
            </div>
        </div>
    );
}