
import { LuSquarePen, LuTrash2 } from "react-icons/lu";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"; 

const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price || 0); 
};

const formatColor = (color) => (color && !color.startsWith('#') ? `#${color}` : color || '#808080'); 

export default function ProductsTable({ 
    products, 
    isLoading, 
    onEdit, 
    onDelete,
    currentPage, 
    totalPages, 
    onPageChange
}) {
    
    const renderPageNumbers = () => {
        const pages = [];
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

    if (isLoading) {
      return (
          <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 text-center py-12 text-lg text-blue-600">
              Carregando produtos...
          </div>
      );
    }

    if (!products || products.length === 0) {
        return (
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200 text-center py-8 text-gray-500">
                Nenhum produto cadastrado.
            </div>
        );
    }
    
    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          
            <h2 className="text-xl font-semibold mb-6">Lista de Produtos ({products.length})</h2>

            <table className="w-full text-sm">
                
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="py-2 text-left font-medium text-gray-500 w-5/12">Produto</th>
                        <th className="py-2 text-left font-medium text-gray-500 w-3/12">Categoria</th>
                        <th className="py-2 text-center font-medium text-gray-500 w-2/12">Preço</th>
                        <th className="py-2 text-center font-medium text-gray-500 w-1/12">Estoque</th>
                        <th className="py-2 text-center font-medium text-gray-500 w-1/12">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => {
                        return (
                            <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                
                                {/* Coluna 1: Nome (Agora ocupando 5/12) */}
                                <td className="py-4 font-semibold text-gray-800 w-5/12">
                                    <span className="truncate">{product.product_name}</span>
                                </td>
                                
                                {/* Coluna 2: Categoria (text-left) */}
                                <td className="py-4 text-gray-600 w-3/12">
                                    {product.category ? (
                                        <div className="flex items-center space-x-2">
                                            <div 
                                                className="w-3 h-3 rounded-full shadow" 
                                                style={{ backgroundColor: formatColor(product.category.color) }}
                                            ></div>
                                            <span className="truncate">{product.category.category_name}</span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">N/A</span>
                                    )}
                                </td>
                           
                                <td className="py-4 text-center text-gray-600 w-2/12 font-medium">{formatPrice(product.price)}</td>

                                
                                <td className="py-4 text-center text-gray-600 font-bold w-1/12">{product.quantity}</td>
                                
                                
                                <td className="py-4 w-1/12">
                                    <div className="flex justify-center items-center space-x-3">
                                        <button 
                                          className="text-black hover:text-red-600 transition-colors"
                                          onClick={() => onEdit(product)}
                                          title="Editar Produto"
                                        >
                                            <LuSquarePen size={18} />
                                        </button>
                                        <button 
                                          className="text-gray-600 hover:text-red-600 transition-colors"
                                          onClick={() => onDelete(product.id)}
                                          title="Excluir Produto"
                                        >
                                            <LuTrash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            
            {totalPages > 1 && ( 
                <nav className="flex justify-center items-center mt-6 space-x-2" aria-label="Paginação da Tabela de Produtos">
                    
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Página Anterior"
                        className="p-2 rounded-full text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                        <FaAngleLeft size={20} />
                    </button>

                    
                    {renderPageNumbers()}
                    
                   
                    <button  
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Próxima Página"
                        className="p-2 rounded-full text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                        <FaAngleRight size={20} />
                    </button>
                </nav>
            )}

        </div>
    );
}