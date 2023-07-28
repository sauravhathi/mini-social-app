const FilterOption = ({ name, value, filters, setFilters }) => (
    <div className="snap-start flex flex-col items-center justify-center">
        <div
            className={`w-20 h-20 rounded-md bg-gray-300 flex justify-center items-center cursor-pointer ${filters === value ? ' border-blue-500' : ' border-gray-500'}`}
            onClick={() => setFilters(value)}
        />
        <span className="text-sm whitespace-nowrap">{name}</span>
    </div>
);


export default FilterOption;