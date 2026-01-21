const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-md font-medium text-xs tracking-wide uppercase border ${
            selectedCategory === category
              ? 'bg-primary-600 text-white border-primary-500 shadow-sm shadow-primary-900/40'
              : 'bg-slate-800/70 text-slate-200 border-slate-700 hover:bg-slate-700/80 hover:border-slate-500'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
