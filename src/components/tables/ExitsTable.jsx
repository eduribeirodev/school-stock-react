import { LuSquarePen, LuTrash2, LuChevronLeft, LuChevronRight } from 'react-icons/lu'; 

export default function ExitsTable({ 
    exits = [], 
    onDelete, 
    onEdit,
    currentPage,
    totalPages,
    onPageChange,
}) {
    
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString); 
        return date.toLocaleDateString('pt-BR'); 
    };
    
    const exitsCount = exits.length; 

    const renderPageNumbers = () => {
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


    return (
        <div className="p-4 bg-white rounded-2xl shadow-lg border border-gray-300 w-full max-w-6xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Histórico de Saídas ({exitsCount})</h2>
            
            {exitsCount === 0 ? (
                <p className="text-center text-gray-500 py-4">Nenhuma saída registrada.</p>
            ) : (
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="pb-2 text-center text-sm font-medium text-gray-600">ID Venda</th>
                            <th className="pb-2 text-center text-sm font-medium text-gray-600">Data</th>
                            <th className="pb-2 text-center text-sm font-medium text-gray-600">Produto</th>
                            <th className="pb-2 text-center text-sm font-medium text-gray-600">Qtd.</th>
                            <th className="pb-2 text-center text-sm font-medium text-gray-600">Valor Total</th> 
                            <th className="pb-2 text-center text-sm font-medium text-gray-600">Funcionário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exits.map((exit) => (
                            <tr key={exit.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">

                                <td className="py-2 text-center text-sm font-medium">{exit.id}</td> 
                                <td className="py-2 text-center text-sm">{formatDate(exit.created_at)}</td> 
                                <td className="py-2 text-center text-sm">{exit.product?.product_name || 'N/A'}</td> 
                                <td className="py-2 text-center text-sm">{exit.quantity}</td> 
                                <td className="py-2 text-center text-sm font-semibold">
                                    R$ {parseFloat(exit.price || 0).toFixed(2)}
                                </td> 
                                <td className="py-2 text-center text-sm">{exit.user?.name || 'Desconhecido'}</td>
                                
                                {/* <td className="py-2 text-center space-x-2">
                                    <button onClick={() => onEdit(exit)} className="text-black hover:text-red-500 p-1" title="Editar Saída">
                                        <LuSquarePen size={18} />
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            {/* Controles de Paginação */}
            {totalPages > 1 && ( 
                <nav className="flex justify-center items-center mt-6 space-x-2" aria-label="Paginação da Tabela de Saídas">
                    
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Página Anterior"
                        className="p-2 rounded-full text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                        <LuChevronLeft size={20} />
                    </button>
                    {renderPageNumbers()}
                    <button  
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Próxima Página"
                        className="p-2 rounded-full text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                        <LuChevronRight size={20} />
                    </button>
                </nav>
            )}
        </div>
    );
}