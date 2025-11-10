import { FiSearch } from "react-icons/fi";

export default function SearchBar({ placeholder = "Buscar produtos...", onSearchChange }) {
    return (
        <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 shadow-sm border border-transparent focus-within:border-gray-300 transition w-full max-w-6xl mx-auto">
            <FiSearch className="text-gray-500 text-lg mr-2" />
            <input
                type="text"
                placeholder={placeholder}
          
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500"
            />
        </div>
    );
}