// Arquivo: Users.js

import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Header from "../../components/header/Header";
import { FiUser } from "react-icons/fi";
import { MdOutlineShield } from "react-icons/md";
import UserModal from "../../components/modals/UserModal";
import UserCard from "../../components/cards/UserCard";
import UsersTable from "../../components/tables/UsersTable";
import useUsers from "../../hooks/useUser";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);


  const {
    users,
    isLoading,
    updateUser,
    newPassword,
    newUser,
    deleteUser,
    
    totalUsersCount, 
    totalPages, 
  } = useUsers(currentPage, pageSize); 

  const [userList, setUserList] = useState(users); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setUserList(users);
    
  }, [users]); 

  useEffect(() => {
    
    setUserList(users);
  }, [users]);


  const handleUserUpdated = (updatedUser) => {
    setUserList((prevList) =>
      prevList.map((u) =>
        u.id === updatedUser.id
          ? { ...u, ...updatedUser }
          : u
      )
    );
  };
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const totalUsuarios = totalUsersCount;
  const totalAdmins = userList.filter((u) => u.isadmin === "admin").length;
  const totalFuncionarios = userList.filter((u) => u.isadmin !== "admin").length;

  return (
    <div className="bg-gray-100 min-h-screen p-2 space-y-10">
      <Header
        title="Usuários"
        SubTitle="Gerencie os usuários do sistema"
        titleButton="Novo Usuário"
        iconButton={FaPlus}
        functionButton={() => setIsModalOpen(true)}
      />

      <div className="flex gap-12 justify-center items-center">
        <UserCard title="Total de Usuários" icon={FiUser} quantidade={totalUsuarios} p1="Total de usuários no sistema"/>
        <UserCard title="Administradores" icon={MdOutlineShield} quantidade={totalAdmins} p1="Total de administradores no sistema"/>
        <UserCard title="Funcionários" icon={FiUser} quantidade={totalFuncionarios} p1="Total de funcionários"/>
      </div>

      <div>
        {isLoading ? (
          <p className="text-center text-gray-500">Carregando usuários...</p>
        ) : (
          <UsersTable
            users={userList}
            onUserUpdated={handleUserUpdated}
            updateUser={updateUser}
            updatePassword={newPassword}

            currentPage={currentPage}
            totalPages={totalPages} 
            onPageChange={handlePageChange}
            deleteUser={deleteUser}
          />
        )}

        <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={newUser} />
      </div>
    </div>
  );
}