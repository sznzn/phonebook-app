const Filter = ({ filterName, handleFilterChange }) => {
    return (
        <div>
            <input placeholder="filter shown with" value={filterName} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter
