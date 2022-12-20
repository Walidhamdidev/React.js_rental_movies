const SearchBox = ({ value, onChange, ...rest }) => {
  return (
    <input
      {...rest}
      type="text"
      name="query"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      className="bg-gray-50 border mb-8 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search..."
    />
  );
};

export default SearchBox;
