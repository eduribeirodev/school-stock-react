import { LuTags } from 'react-icons/lu';

export default function CategoryFilter({ categories = [], selectedCategory, onSelectCategory }) {
    
    const uniqueCategories = [
        'Todos', 
        ...Array.from(new Set(categories.map(cat => cat.category_name)))
    ];

    return (
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide ">
            
            <LuTags className="text-gray-500 shrink-0" size={20} />

            {uniqueCategories.map((name) => {
                const isSelected = name === selectedCategory;
                
                return (
                    <button
                        key={name}
                        onClick={() => onSelectCategory(name)}
                        className={`
                            px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 
                            whitespace-nowrap shrink-0 shadow-md
                            ${isSelected 
                                ? 'bg-red-600 text-white shadow-md' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }
                        `}
                    >
                        {name}
                    </button>
                );
            })}
        </div>
    );
}