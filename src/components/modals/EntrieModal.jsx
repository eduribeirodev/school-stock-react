import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { LuPlus, LuX } from 'react-icons/lu';

export default function EntrieModal({ isOpen, onClose, products = [], suppliers = [], onSubmit }) {
    
    const [purchaseItems, setPurchaseItems] = useState([]); 
    const [supplierId, setSupplierId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
        if (isOpen) {
            setPurchaseItems([]);
            setSupplierId('');
            setIsSubmitting(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const totalAmount = purchaseItems.reduce((sum, item) => sum + (item.quantity * item.priceUnit), 0).toFixed(2);

    const handleAddItem = () => {
        setPurchaseItems([...purchaseItems, { productId: '', quantity: 1, priceUnit: 0, tempId: Date.now() }]);
    };

    const handleRemoveItem = (tempId) => {
        setPurchaseItems(purchaseItems.filter(item => item.tempId !== tempId));
    };

    const handleItemChange = (tempId, field, value) => {
        setPurchaseItems(purchaseItems.map(item => 
            item.tempId === tempId ? { ...item, [field]: value } : item
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!supplierId || supplierId === '') {
            toast.error("Por favor, selecione o fornecedor.");
            return;
        }

        if (purchaseItems.length === 0 || purchaseItems.some(item => !item.productId || item.quantity <= 0 || item.priceUnit <= 0)) {
            toast.error("Por favor, adicione itens válidos à compra.");
            return;
        }

        const dataToSend = {
            supplier_id: parseInt(supplierId), 
            product_ids: purchaseItems.map(item => parseInt(item.productId)),
            quantity: purchaseItems.map(item => parseInt(item.quantity)),
            price_unit: purchaseItems.map(item => parseFloat(item.priceUnit).toFixed(2)),
        };
        
        setIsSubmitting(true);

        try {
            await onSubmit(dataToSend); 
            onClose();
        } catch (error) {
        
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const productMap = products.reduce((map, p) => ({ ...map, [p.id]: p }), {});


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Registrar Nova Entrada (Compra)</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <LuX size={24} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    
                  
                    <div className="mb-4">
                        <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">Fornecedor (Obrigatório)</label>
                        <select
                            id="supplier"
                            value={supplierId}
                            onChange={(e) => setSupplierId(e.target.value)}
                            required 
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white"
                            title="Selecione o fornecedor que está a fornecer os produtos."
                        >
                            <option value="" disabled>Selecione um Fornecedor</option>
                            {suppliers.map((s) => (
                                <option key={s.id} value={String(s.id)}>
                                    {s.name} ({s.contact}) 
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <h4 className="text-lg font-semibold mt-6 mb-3">Itens da Compra</h4>
                    
                    {purchaseItems.length === 0 && (
                        <p className="text-gray-500 mb-4">Adicione produtos comprados para começar.</p>
                    )}

                
                    <div className="flex space-x-3 text-xs font-medium text-gray-500 mb-2 px-3">
                         <div className="flex-1">Produto</div>
                         <div className="w-20 shrink-0 text-center">Quantidade</div>
                         <div className="w-24 shrink-0 text-right">Preço Unidade</div>
                         <div className="w-8 shrink-0"></div>
                    </div>
                    
                    <div className="space-y-4">
                        {purchaseItems.map((item, index) => {
                            const currentProduct = productMap[item.productId];
                            return (
                                <div key={item.tempId} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border">
                                   
                                    <div className="flex-1">
                                        <select
                                            value={item.productId}
                                            onChange={(e) => handleItemChange(item.tempId, 'productId', e.target.value)}
                                            required
                                            className="w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white text-sm"
                                            title="Selecione o produto que está a dar entrada"
                                        >
                                            <option value="" disabled>Selecione o Produto</option>
                                            {products.map((p) => (
                                                <option key={p.id} value={String(p.id)}>
                                                    {p.product_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                               
                                    <div className="w-20 shrink-0">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(item.tempId, 'quantity', parseInt(e.target.value) || 0)}
                                            required
                                            placeholder="Qtd" 
                                            className="w-full rounded-md border-gray-300 shadow-sm p-2 border text-sm text-center"
                                            title="Quantidade comprada/recebida" 
                                        />
                                    </div>
                                    
                                 
                                    <div className="w-24 shrink-0">
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            value={item.priceUnit}
                                            onChange={(e) => handleItemChange(item.tempId, 'priceUnit', parseFloat(e.target.value) || 0)}
                                            required
                                            placeholder="R$ 0.00" 
                                            className="w-full rounded-md border-gray-300 shadow-sm p-2 border text-sm text-right"
                                            title="Preço unitário de compra" 
                                        />
                                    </div>

                              
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(item.tempId)}
                                        className="p-2 text-red-500 hover:text-red-700 transition"
                                        title="Remover Item"
                                    >
                                        <LuX size={20} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    
                  
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="flex items-center justify-center mt-3 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
                    >
                        <LuPlus size={16} className="mr-1"/> Adicionar Produto
                    </button>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t">
                        <h4 className="text-xl font-bold text-gray-800">TOTAL DA COMPRA: R$ {totalAmount}</h4>
                        
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
                                disabled={isSubmitting || purchaseItems.length === 0}
                                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? 'Registrando...' : 'Registrar Compra'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}