import { useState, useEffect } from "react"; 
import Header from "../../components/header/Header";
import { FaPlus } from "react-icons/fa";
import { FiTruck } from "react-icons/fi"; 
import SuppliersModal from "../../components/modals/SuppliersModal";
import SuppliersTable from "../../components/tables/SuppliersTable";
import useSupplier from "../../hooks/useSupplier";
import SupplierCard from "../../components/cards/SupplierCard";


export default function Suppliers() {


    const {
        suppliers,
        isLoading,
        error, 
        
        newSupplier,
        deleteSupplier,
        updateSupplier,
        
    } = useSupplier(); 

    const [supplierList, setSupplierList] = useState(suppliers);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setSupplierList(suppliers);
    }, [suppliers]); 

    
    const totalFornecedores = supplierList.length || 0;
    
    return (
        <div className="bg-gray-100 min-h-screen p-2 space-y-10">
            
            <Header 
                title="Fornecedores" 
                SubTitle="Gerencie os fornecedores da escola" 
                iconButton={FaPlus} 
                titleButton="Novo Fornecedor" 
                functionButton={() => setIsModalOpen(true)}
            />
            
            <div className="flex gap-12 justify-center items-center">
                <SupplierCard title="Total de Fornecedores" icon={FiTruck} quantidade={totalFornecedores} p1="Total de fornecedores no sistema"/>
            </div>


            <div>
                {isLoading ? (
                    <p className="text-center text-gray-500">Carregando fornecedores...</p>
                ) : (
                    <SuppliersTable 
                        suppliers={supplierList}
                        deleteSupplier={deleteSupplier}
                        updateSupplier={updateSupplier}
                    />
                )}
                
                <SuppliersModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onConfirm={newSupplier} 
                />
            </div>
        </div>
    );
}