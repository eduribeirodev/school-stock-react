import { useState, useEffect } from "react";

export default function EditSupplierModal({ isOpen, onClose, supplier, updateSupplier }) {
    
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
    });

    useEffect(() => {
        if (supplier) {
            setFormData({
                name: supplier.name || "",
                contact: supplier.contact || "",
            });
        } else {
            setFormData({
                name: "",
                contact: "",
            });
        }
    }, [supplier]); 


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.contact) {
            alert("Nome da Empresa e Pessoa de Contato são obrigatórios!");
            return;
        }

        if (updateSupplier && supplier?.id) {
            try {
                await updateSupplier(supplier.id, formData); 
                onClose(); 
            } catch (error) {
                console.error("Erro ao atualizar fornecedor:", error);
            }
        }
    };


    if (!isOpen || !supplier) return null;


    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-lg p-6 w-[520px]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-1">Editar Fornecedor: {supplier.name}</h2>
                <p className="text-gray-500 text-sm mb-5">
                    Modifique os dados do fornecedor
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nome da Empresa
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Digite o nome da empresa"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black/80"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pessoa de Contato
                            </label>
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="Eduardo Ribeiro"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black/80"
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}