import { FaPlus } from "react-icons/fa";
import Header from "../../components/header/Header";
import CategoriesTable from "../../components/tables/CategoriesTable";
import { useState } from "react";
import useCategory from "../../hooks/useCategory"; 
import CategoryModal from "../../components/modals/CategoryModal"; 


export default function Categories() {
  const { 
    categories, 
    isLoading, 
    deleteCategory, 
    newCategory, 
    updateCategory 
  } = useCategory(); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); 


  const handleOpenCreateModal = () => {
    setEditingCategory(null); 
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setEditingCategory(category); 
    setIsModalOpen(true);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSaveCategory = async (data, id) => {
    if (id) {
      await updateCategory(id, data);
    } else {
      await newCategory(data);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-2 space-y-10 items"> 
      
      <Header
        title="Categorias"
        SubTitle="Gerencie as categorias de produtos"
        titleButton="Nova Categoria"
        iconButton={FaPlus}
        functionButton={handleOpenCreateModal} 
      />
      
      <div >
        {isLoading ? (
          <div className="text-center text-lg py-10">Carregando categorias...</div>
        ) : (
          <CategoriesTable
            categories={categories}
            onEdit={handleOpenEditModal} 
            onDelete={deleteCategory}   
          />
        )}
        
        <CategoryModal 
          isOpen={isModalOpen} 
          onClose={handleModalClose} 
          onSubmit={handleSaveCategory} 
          initialData={editingCategory || {}}
        />
      </div>
    </div>
  );
}