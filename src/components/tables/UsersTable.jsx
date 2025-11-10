import { useState } from "react";
import { FaRegEdit, FaAngleLeft, FaAngleRight, FaTrashAlt } from "react-icons/fa"; 
import EditUserModal from "../modals/EditUserModal"; 


export default function UsersTable({ 
    users, 
    onUserUpdated, 
    updateUser, 
    updatePassword,
    currentPage, 
    totalPages, 
    onPageChange,
    deleteUser
}) { 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };
    
    const handleDeleteClick = (user) => {
        if (window.confirm(`Tem certeza que deseja excluir o usuário ${user.name} (Registro: ${user.number_registration})? Esta ação é irreversível.`)) {
            deleteUser(user.id); 
        }
    };

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


    return (
        <div className="p-4 bg-white rounded-2xl shadow-lg border border-gray-300 ml-2">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center align-middle">
                Lista de Usuários ({users.length} exibidos)
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-center min-w-max ">
                    <thead>
                        <tr className="border-gray-300">
                            <th className="pb-2 text-gray-700 align-middle px-4">Nome</th>
                            <th className="pb-2 text-gray-700 align-middle px-4">Número de Registro</th>
                            <th className="pb-2 text-gray-700 align-middle px-4">Tipo</th>
                            <th className="pb-2 text-gray-700 align-middle px-4">Status</th>
                            <th className="pb-2 text-gray-700 align-middle px-4">Ações</th> 
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-3 text-gray-800 align-middle px-4">{user.name}</td>
                                <td className="py-3 text-gray-800 align-middle px-4">{user.number_registration}</td>
                                <td className="py-3 align-middle px-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                                            user.isadmin === "admin" ? "bg-red-600" : "bg-gray-600"
                                        }`}
                                    >
                                        {user.isadmin === "admin" ? "Administrador" : "Funcionário"}
                                    </span>
                                </td>
                                <td className="py-3 align-middle px-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                                            user.isactive === "active" ? "bg-green-600" : "bg-red-600"
                                        }`}
                                    >
                                        {user.isactive === "active" ? "Ativo" : "Inativo"}
                                    </span>
                                </td>
                                <td className="py-3 align-middle px-4">
                                    <div className="flex items-center justify-evenly space-x-2"> 
                                        <button
                                            onClick={() => handleEditClick(user)}
                                            aria-label={`Editar usuário ${user.name}`}
                                            className="p-1 rounded-full text-black/80 hover:text-red-600 transition-colors"
                                        >
                                            <FaRegEdit size={22} />
                                        </button>

                                        <button
                                            onClick={() => handleDeleteClick(user)}
                                            aria-label={`Excluir usuário ${user.name}`}
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

            {totalPages > 1 && ( 
                <nav className="flex justify-center items-center mt-6 space-x-2" aria-label="Paginação da Tabela de Usuários">
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

            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedUser(null);
                }}
                user={selectedUser}
                onUserUpdated={onUserUpdated} 
                updateUser={updateUser}
                updatePassword={updatePassword}
            />
        </div>
    );
}