
import { LuX } from 'react-icons/lu';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function ExitModal({ isOpen, onClose, products = [], onSubmit }) {
    
    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('PIX');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
        if (isOpen) {
            setSelectedProductId('');
            setQuantity(1);
            setPaymentMethod('PIX');
            setIsSubmitting(false);
        }
    }, [isOpen]);

    const selectedProduct = products.find(p => p.id === parseInt(selectedProductId));
    const maxStock = selectedProduct ? (selectedProduct.quantity || 0) : 0;
    
    const productPrice = selectedProduct ? selectedProduct.price : 0;
    const totalAmount = (productPrice * quantity).toFixed(2);

    if (!isOpen) return null;


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedProductId || quantity <= 0 || quantity > maxStock) {
            toast.error("Por favor, selecione um produto e uma quantidade válida (máx: " + maxStock + ")");
            return;
        }

        const saleData = {
            payment: parseFloat(totalAmount), 
            payment_method: paymentMethod,
            product_id: [parseInt(selectedProductId)], 
            quantity: [parseInt(quantity)]
        };
        
        setIsSubmitting(true);

        try {
            await onSubmit(saleData); 
            
            window.location.reload(); 
            
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={onClose} 
        >
            <div
                className="bg-white rounded-xl shadow-lg p-6 w-[450px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-bold">Registrar Nova Saída (Venda)</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <LuX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Produto</label>
                        <select
                            value={selectedProductId}
                            onChange={(e) => setSelectedProductId(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-red-500 focus:border-red-500"
                            required
                        >
                            <option value="" disabled>Selecione um produto</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.product_name} (Estoque: {product.quantity})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            min="1"
                            max={maxStock}
                            className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-red-500 focus:border-red-500"
                            required
                        />
                        {selectedProduct && <p className="text-xs text-gray-500 mt-1">Disponível em estoque: {maxStock}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pagamento</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                        >
                            <option value="PIX">PIX</option>
                            <option value="CC">Cartão de Crédito</option>
                            <option value="CD">Cartão de Débito</option>
                            <option value="VA">Dinheiro</option>
                        </select>
                    </div>

                    <div className="pt-2">
                        <p className="text-lg font-bold text-gray-800 mb-3">Valor Total: R$ {totalAmount}</p>
                        
                        <button
                            type="submit"
                            disabled={isSubmitting || !selectedProductId || quantity <= 0 || quantity > maxStock}
                            className="w-full flex items-center justify-center bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition disabled:opacity-50"
                        >
                            {isSubmitting ? 'Registrando...' : 'Registrar Saída'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}