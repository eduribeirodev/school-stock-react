
import { FaRegEdit, FaTrashAlt } from "react-icons/fa"; 
import { useState } from "react"; 
import EditSupplierModal from "../modals/EditSupplierModal"; 


export default function SuppliersTable({ 
    suppliers,
    updateSupplier, 
    deleteSupplier, 
}) {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    
    
    const handleEditClick = (supplier) => {
        setSelectedSupplier(supplier);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (supplier) => {
            deleteSupplier(supplier.id); 
    };

    return (
        <div className="p-4 bg-white rounded-2xl shadow-lg border border-gray-300 ml-2"> 
            
            <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center align-middle">
                Lista de Fornecedores ({suppliers?.length || 0} exibidos) 
            </h2>
        
            <div className="overflow-x-auto">
                <table className="w-full text-center min-w-max"> 
                    <thead>
                        <tr className="border-gray-300">
                            <th className="pb-2 text-gray-700 align-middle px-4">Nome</th>
                            <th className="pb-2 text-gray-700 align-middle px-4">Contato</th>
                            <th className="pb-2 text-gray-700 align-middle px-4">Ações</th> 
                        </tr>
                    </thead>

                    <tbody>
                        {suppliers?.map((supplier) => ( 
                            <tr key={supplier.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors"> 

                                <td className="py-3 text-gray-800 align-middle px-4">{supplier.name}</td> 
                                <td className="py-3 text-gray-800 align-middle px-4">{supplier.contact}</td> 

                                <td className="py-3 align-middle px-4">
                                    <div className="flex items-center justify-evenly space-x-2"> 
                                        <button
                                            onClick={() => handleEditClick(supplier)}
                                            aria-label={`Editar fornecedor ${supplier.name}`}
                                            className="p-1 rounded-full text-black/80 hover:text-red-600 transition-colors"
                                        >
                                            <FaRegEdit size={22} />
                                        </button>

                                        <button
                                            onClick={() => handleDeleteClick(supplier)}
                                            aria-label={`Excluir fornecedor ${supplier.name}`}
                                            className="p-1 rounded-full text-black/80 hover:text-red-600 transition-colors"
                                        >
                                            <FaTrashAlt size={22} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <EditSupplierModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedSupplier(null);
                }}
                supplier={selectedSupplier} 
                updateSupplier={updateSupplier} 
            />
        </div>
    );
}