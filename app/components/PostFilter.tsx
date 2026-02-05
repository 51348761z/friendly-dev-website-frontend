type PostFilterProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export const PostFilter = ({
  searchQuery,
  onSearchChange,
}: PostFilterProps) => {
  return (
    <div className="mb-6">
      <input
        type="search"
        placeholder="Search posts..."
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
      />
    </div>
  );
};
