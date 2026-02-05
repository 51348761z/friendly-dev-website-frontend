type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <ul className="mb-8 flex flex-wrap gap-2" aria-label="Project categories">
      {categories.map((category) => {
        const isActive = category === selectedCategory;

        return (
          <li key={category}>
            <button
              type="button"
              className={`cursor-pointer rounded px-3 py-1 text-sm ${isActive ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"} `}
              aria-pressed={isActive}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
