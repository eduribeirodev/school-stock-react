import CartItemCard from "../cards/CartItemCard";
import { useState } from "react";
import { toast } from "sonner";

export default function CartModal({ isOpen, onClose, items = [], onRemove, onCheckout, onClearCart, onIncrement, onDecrement }) {
    
    if (!isOpen) return null; 

    const [paymentMethod, setPaymentMethod] = useState("PIX"); 
    
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const firstItemColor = items.length > 0 ? items[0].color : null;
    const checkoutButtonColor = firstItemColor ? `#${firstItemColor.replace('#', '')}` : '#10b981'; 

    const handleCheckoutClick = async () => {
        if (items.length === 0) {
            toast.error("O carrinho está vazio.");
            return;
        }

        const saleData = {
            payment: parseFloat(totalAmount).toFixed(2), 
            payment_method: paymentMethod,
            product_id: items.map(item => parseInt(item.id)), 
            quantity: items.map(item => parseInt(item.quantity))
        };

        await onCheckout(saleData)
            .then(() => {
                onClearCart();
                onClose(); 
            })
            .catch((error) => {
                if (error.response) { 
                    console.error("ERRO DE RESPOSTA DA API (STATUS):", error.response.status);
                    console.error("DADOS DA FALHA (PAYLOAD):", error.response.data);
                } else {
                    console.error("ERRO DE EXECUÇÃO/REDE:", error);
                }
                throw error; 
            });
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={onClose} 
        >
            <div
                className="bg-white rounded-xl shadow-lg p-6 w-[400px]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Carrinho</h2>

                <div className="max-h-60 overflow-y-auto mb-4 border-b pb-4">
                    {items?.length > 0 ? (
                        items.map((item) => (
                            <CartItemCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                onRemove={onRemove}
                                onIncrement={onIncrement} 
                                onDecrement={onDecrement}
                                
                                category={item.category_name || 'Geral'} 
                                categoryHexColor={item.color}           
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">Carrinho vazio</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pagamento</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 bg-white"
                    >
                        <option value="PIX">PIX</option>
                        <option value="Currency">Dinheiro</option>
                    </select>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <h3 className="text-xl font-bold text-gray-800">Total: R$ {totalAmount.toFixed(2)}</h3>
                    
                    <button
                        onClick={handleCheckoutClick}
                        disabled={items.length === 0}
                        
                        
                        className="text-white py-2 px-4 rounded-lg font-bold hover:opacity-80 transition disabled:opacity-50 bg-red-500"
                    >
                        Finalizar Compra
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}