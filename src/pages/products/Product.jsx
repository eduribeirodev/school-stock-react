import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Header from "../../components/header/Header";
import ProductsTable from "../../components/tables/ProductsTable";
import ProductModal from "../../components/modals/ProductModal";
import useProduct from "../../hooks/useProduct"; 
import ProductCard from "../../components/cards/ProductCard"; 
import { MdOutlineShield } from "react-icons/md";


export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; 

  const {
    products,
    isLoading,
    newProduct,
    updateProduct,
    deleteProduct,
    totalProductsCount, 
    totalPages, 
    getAllProducts 
  } = useProduct(currentPage, pageSize); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenCreateModal = () => {
    setEditingProduct(null); 
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product); 
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };
  
  const handleSaveProduct = async (data, id) => {
    try {
        if (id) {
          await updateProduct(id, data);
        } else {
          await newProduct(data);
        }
        await getAllProducts(); 
        handleCloseModal();
    } catch (e) {
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  const totalProdutos = totalProductsCount;

  return (
    <div className="bg-gray-100 min-h-screen p-2 space-y-10">
      <Header
        title="Produtos"
        SubTitle={`Gerencie os produtos (${totalProductsCount} no total)`}
        titleButton="Novo Produto"
        iconButton={FaPlus}
        functionButton={handleOpenCreateModal}
      />

      <div className="flex gap-12 justify-center items-center">
        <ProductCard title="Total de Produtos" icon={MdOutlineShield} quantidade={totalProdutos} p1="Total de itens cadastrados"/>
      </div>

      <div>
        {isLoading ? (
          <p className="text-center text-gray-500">Carregando produtos...</p>
        ) : (
          <ProductsTable
            products={products || []} 
            isLoading={isLoading}
            
            onEdit={handleOpenEditModal}
            onDelete={deleteProduct}
            
            currentPage={currentPage}
            totalPages={totalPages} 
            onPageChange={handlePageChange}
          />
        )}

        <ProductModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onSubmit={handleSaveProduct}
          initialData={editingProduct || {}}
        />
      </div>
    </div>
  );
}