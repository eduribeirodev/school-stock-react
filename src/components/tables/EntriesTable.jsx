import { LuTrash2, LuChevronLeft, LuChevronRight } from 'react-icons/lu'; 

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); 
};

const renderPageNumbers = (currentPage, totalPages, onPageChange) => {
    const pages = [];
    if (!totalPages || totalPages <= 1) return null;

    const maxPagesToShow = 5; 
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                aria-current={i === currentPage ? "page" : undefined}
                className={`
                    mx-1 px-3 py-1 rounded-md text-sm font-medium transition-colors 
                    ${
                        i === currentPage
                            ? "bg-red-600 text-white shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }
                `}
            >
                {i}
            </button>
        );
    }
    return pages; 
};

export default function EntriesTable({ compras = [], onDelete, currentPage, totalPages, onPageChange, getSupplierName }) {

    const entriesCount = compras.length;

    const formatCurrency = (value) => {
        if (typeof value !== 'number' && typeof value !== 'string') return 'R$ 0.00';
        const num = parseFloat(value);
        if (isNaN(num)) return 'R$ 0.00';
        return `R$ ${num.toFixed(2).replace('.', ',')}`;
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
        
            <h2 className="text-xl font-semibold mb-4">Histórico de Entradas ({entriesCount})</h2>

            {entriesCount === 0 ? (
                <p className="text-center text-gray-500 py-4">Nenhuma entrada registrada.</p>
            ) : (
                <>
                {compras.map((compra) => {
                    
                    const purchasedItems = compra.items_purchase || [];
                    
                    const totalCompra = purchasedItems.reduce((sum, item) => 
                        sum + (item.quantity * item.price_unit), 0);

                    return (
                        <div 
                            key={compra.id} 
                            className="p-6 bg-white rounded-2xl shadow-lg border border-gray-300 mb-6" 
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Compra #{compra.id}</h3>
                                    
                                    <p className="text-gray-600">
                                        Fornecedor: 
                                        <span className="font-medium text-gray-800 ml-1">
                                            {getSupplierName(compra.supplier_id)} 
                                        </span>
                                    </p> 
                                    
                                    <p className="text-gray-600">Data: {formatDate(compra.date)}</p>
                                    <p className="text-gray-600">Registrado por ID: {compra.user_id || 'Sistema'}</p> 
                                </div>
                                
                                <div className="text-right flex items-center space-x-4">
                                    <div className="text-right">
                                        <p className="text-gray-600 text-sm">Total</p>
                                        <h3 className="text-2xl font-bold text-red-600">{formatCurrency(totalCompra)}</h3>
                                    </div>
                                    
                                    <button 
                                        onClick={() => onDelete(compra.id)} 
                                        className="p-2 text-black hover:text-red-700 transition-colors"
                                        title="Excluir Compra"
                                    >
                                        <LuTrash2 size={24} />
                                    </button>
                                </div>
                            </div>

                            <table className="w-full border-t border-gray-300 pt-4">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-2 text-left font-medium text-gray-500">Produto</th>
                                        <th className="py-2 text-right font-medium text-gray-500">Quantidade</th>
                                        <th className="py-2 text-right font-medium text-gray-500">Preço Unitário</th>
                                        <th className="py-2 text-right font-medium text-gray-500">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchasedItems.length > 0 ? (
                                        purchasedItems.map((item) => (
                                            <tr key={item.id} className="border-b border-gray-200 last:border-b-0">
                                                <td className="py-3 text-left">{item.product?.product_name || 'N/A'}</td> 
                                                <td className="py-3 text-right">{item.quantity}</td>
                                                <td className="py-3 text-right">{formatCurrency(item.price_unit)}</td> 
                                                <td className="py-3 text-right font-medium">{formatCurrency(item.quantity * item.price_unit)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="border-b border-gray-200 last:border-b-0">
                                            <td className="py-3 text-left font-medium" colSpan="4">Detalhes não disponíveis na listagem.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    );
                })}
                
                {totalPages > 1 && ( 
                    <nav className="flex justify-center items-center mt-6 space-x-2" aria-label="Paginação">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-full text-gray-600 disabled:text-gray-400 hover:bg-gray-100 transition-colors"
                        >
                            <LuChevronLeft size={20} />
                        </button>
                        
                        {renderPageNumbers(currentPage, totalPages, onPageChange)}
                        
                        <button  
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-full text-gray-600 disabled:text-gray-400 hover:bg-gray-100 transition-colors"
                        >
                            <LuChevronRight size={20} />
                        </button>
                    </nav>
                )}
                </>
            )}
        </div>
    );
}