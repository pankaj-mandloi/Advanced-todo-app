import { FiSearch } from "react-icons/fi";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-6 relative">
      <FiSearch className="absolute left-3 top-3.5 text-gray-400" size={18} />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by title or description..."
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
      />
    </div>
  );
};

export default SearchBar;