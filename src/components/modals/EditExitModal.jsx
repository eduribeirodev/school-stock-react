import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { LuX } from 'react-icons/lu';

export default function ExitEditModal({ isOpen, onClose, onSubmit, products = [], initialData }) {
    
    const isEditing = !!initialData?.id; 
    
    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const currentProduct = products.find(p => p.id === parseInt(selectedProductId));
    const maxStock = currentProduct ? (currentProduct.quantity || 0) : 0;
    const unitPrice = currentProduct ? currentProduct.price : 0;
    const totalAmount = (unitPrice * quantity).toFixed(2);


    useEffect(() => {
        if (isOpen && isEditing) {
            setSelectedProductId(String(initialData.product_id) || ''); 
            setQuantity(initialData.quantity || 0);
            setPaymentMethod(initialData.payment_method || 'PIX');
        } 
        setIsSubmitting(false);
    }, [initialData, isOpen, isEditing, products]); 
    
    
    if (!isOpen || !isEditing) return null;


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedProductId || quantity <= 0 || quantity > maxStock) {
            toast.error(`Por favor, verifique o produto e a quantidade (máx: ${maxStock}).`);
            return;
        }
        
        const dataToSend = {
            payment: parseFloat(totalAmount), 
            payment_method: paymentMethod,
            product_id: [parseInt(selectedProductId)],
            quantity: [parseInt(quantity)],
        };
        
        setIsSubmitting(true);
        try {
            await onSubmit(dataToSend, initialData.id); 
        } catch(e) {
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {`Editar Saída #${initialData.id}`}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <LuX size={24} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Produto</label>
                        <select
                            value={selectedProductId}
                            onChange={(e) => setSelectedProductId(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white"
                        >
                            <option value="" disabled>Selecione um produto</option>
                            {products.map((p) => (
                                <option key={p.id} value={String(p.id)}>
                                    {p.product_name} (Estoque: {p.quantity})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex space-x-4 mb-4">
                        <div className="w-1/2">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantidade</label>
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                max={maxStock}
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                            />
                            <p className="text-xs text-gray-500 mt-1">Disponível em estoque: {maxStock}</p>
                        </div>
                        
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Preço Unitário</label>
                            <div className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-gray-100 text-gray-600">
                                R$ {unitPrice.toFixed(2)}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="payment" className="block text-sm font-medium text-gray-700">Método de Pagamento</label>
                        <select
                            id="payment"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white"
                        >
                            <option value="PIX">PIX</option>
                            <option value="CARTAO">Cartão</option>
                            <option value="DINHEIRO">Dinheiro</option>
                        </select>
                    </div>
                    
                    <div className="flex justify-between items-center space-x-3 mt-6 pt-4 border-t">
                        <h4 className="text-xl font-bold text-gray-800">TOTAL: R$ {totalAmount}</h4>
                        
                        <div className="flex space-x-3">
                            <button 
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                disabled={isSubmitting || !selectedProductId || quantity <= 0 || quantity > maxStock}
                                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}