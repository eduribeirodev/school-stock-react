
import { useState, useEffect } from 'react';


export default function CategoryModal({ isOpen, onClose, onSubmit, initialData = {} }) {
  const isEditing = !!initialData.id;
  
  const [name, setName] = useState(initialData.category_name || '');
  const initialColor = initialData.color ? `#${initialData.color}` : '#000000';
  const [color, setColor] = useState(initialColor); 

  useEffect(() => {
    setName(initialData.category_name || '');
    setColor(initialData.color ? `#${initialData.color}` : '#000000');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    const dataToSend = {
      name: name,
      color: color.replace('#', ''), 
    };

    onSubmit(dataToSend, initialData.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          
        
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>

          
          <div className="mb-6 flex items-center justify-between">
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">Cor:</label>
            <div className="flex items-center space-x-3">
              <input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 p-0.5 rounded-md border-gray-300 shadow-sm cursor-pointer border"
              />
              <span className="text-gray-600 font-mono text-sm uppercase">{color}</span>
            </div>
          </div>
          
     
          <div className="flex justify-end space-x-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              {isEditing ? 'Salvar Alterações' : 'Criar Categoria'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}