import { LuFolder, LuSquarePen, LuTrash2 } from "react-icons/lu";

export default function CategoriesTable({ categories, onDelete, onEdit }) {
  
  const formatColor = (color) => (color && !color.startsWith('#') ? `#${color}` : color || '#808080'); 

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      
      <h2 className="text-xl font-semibold mb-6">
        Lista de Categorias ({categories.length})
      </h2>

      <div className="flex items-center mb-4 text-sm font-medium text-gray-500">
        <div className="w-7/12">Nome</div>
        <div className="w-2/12 text-center">Cor</div>
        <div className="w-3/12 text-center">Ações</div>
      </div>

      <div>
        {categories.length > 0 ? (
          categories.map((category) => (
            
            <div 
              key={category.id} 
              className="flex items-center py-4 border-t border-gray-200"
            >
              <div className="w-7/12 flex items-center">
                <LuFolder 
                  className="mr-3" 
                  style={{ color: formatColor(category.color) }} 
                  size={20} 
                />
                <span className="font-medium text-gray-800">{category.category_name}</span>
              </div>
              
              <div className="w-2/12 flex justify-center">
                <div 
                  className="w-5 h-5 rounded-full shadow border border-gray-300" 
                  style={{ backgroundColor: formatColor(category.color) }}
                  title={category.color}
                >
                </div>
              </div>
              
              <div className="w-3/12 flex justify-center space-x-4">
                <button 
                  className="text-gray-600 hover:text-red-600 transition-colors"
                  onClick={() => onEdit(category)}
                  title="Editar Categoria"
                >
                  <LuSquarePen size={20} />
                </button>
                <button 
                  className="text-gray-600 hover:text-red-600 transition-colors"
                  onClick={() => onDelete(category.id)}
                  title="Excluir Categoria"
                >
                  <LuTrash2 size={20} />
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">Nenhuma categoria encontrada.</div>
        )}
      </div>

    </div>
  );
}