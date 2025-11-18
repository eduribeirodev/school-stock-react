import { useState, useEffect } from "react";
import useCategory from "../../hooks/useCategory";
import { toast } from "sonner";
import useSupplier from "../../hooks/useSupplier"; 

export default function ProductModal({ isOpen, onClose, onSubmit, initialData = {} }) {
  const isEditing = !!initialData.id;

  const [name, setName] = useState(initialData.product_name || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [categoryId, setCategoryId] = useState(
    initialData.category_id ? String(initialData.category_id) : ""
  );
  const [supplierId, setSupplierId] = useState(
    initialData.supplier_id ? String(initialData.supplier_id) : ""
  );
  const [quantity, setQuantity] = useState(initialData.quantity || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { categories, isLoading: isLoadingCategories } = useCategory();
  const { suppliers, isLoading: isLoadingSuppliers } = useSupplier(); 

  useEffect(() => {
    setName(initialData.product_name || "");
    setPrice(initialData.price || "");
    setQuantity(initialData.quantity || 0);

    if (initialData.category_id) {
      setCategoryId(String(initialData.category_id));
    } else if (categories && categories.length > 0) {
      setCategoryId(String(categories[0].id));
    } else {
      setCategoryId("");
    }

    if (initialData.supplier_id) {
      setSupplierId(String(initialData.supplier_id));
    } else if (suppliers && suppliers.length > 0) {
      setSupplierId(String(suppliers[0].id));
    } else {
      setSupplierId("");
    }
  }, [initialData, categories, suppliers]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !categoryId || !supplierId) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!isEditing && (quantity === null || quantity === undefined || quantity < 0)) {
        toast.error("Por favor, preencha a quantidade inicial.");
        return;
    }

    setIsSubmitting(true);

    const dataToSend = {
      name: name,
      price: parseFloat(price).toFixed(2),
      category_id: parseInt(categoryId),
      supplier_id: parseInt(supplierId),
      ...(!isEditing && { quantity: parseInt(quantity) }), 
    };
    
    const idToPass = isEditing ? initialData.id : null;
    
    console.log('Payload sendo enviado:', dataToSend);

    try {
      await onSubmit(dataToSend, idToPass); 
      
      onClose(); 
      
      toast.success(`Produto ${isEditing ? 'atualizado' : 'criado'} com sucesso!`);

    } catch (error) {
      console.error("Erro na submissão do produto:", error);
      const apiError = error.response?.data?.message || "Erro ao salvar o produto. Tente novamente.";
      toast.error(apiError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled = isLoadingCategories || isLoadingSuppliers || categories.length === 0 || suppliers.length === 0 || isSubmitting;

  return (
    <div 
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          {isEditing ? "Editar Produto" : "Novo Produto"}
        </h3>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome do Produto *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Categoria *
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                disabled={isLoadingCategories || categories.length === 0 || isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white"
              >
                <option value="" disabled>
                  {isLoadingCategories
                    ? "Carregando..."
                    : categories.length === 0
                    ? "Nenhuma categoria"
                    : "Selecione uma categoria"}
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={String(cat.id)}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Preço (R$) *
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
            </div>
          </div>

            <div className="mb-4">
              <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                Fornecedor *
              </label>
              <select
                id="supplier"
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                required
                disabled={isLoadingSuppliers || suppliers.length === 0 || isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white"
              >
                <option value="" disabled>
                  {isLoadingSuppliers
                    ? "Carregando Fornecedores..."
                    : suppliers.length === 0
                    ? "Nenhum fornecedor"
                    : "Selecione um fornecedor"}
                </option>
                {suppliers.map((supp) => (
                  <option key={supp.id} value={String(supp.id)}>
                    {supp.supplier_name}
                  </option>
                ))}
              </select>
            </div>

          {!isEditing && (
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantidade em Estoque *
              </label>
              <input
                id="quantity"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                
                className="mt-1 block w-1/4 rounded-md border-gray-300 shadow-sm p-2 border"
              />
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              disabled={isButtonDisabled}
            >
              {isSubmitting 
                ? (isEditing ? "Salvando..." : "Criando...")
                : (isEditing ? "Salvar Alterações" : "Criar Produto")
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}