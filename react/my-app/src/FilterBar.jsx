function FilterBar({ filter, setFilter }) {
  return (
    <div className="filter-bar">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={filter === 'active' ? 'active' : ''}
        onClick={() => setFilter('active')}
      >
        Active
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
      <button
        className={filter === 'high' ? 'active' : ''}
        onClick={() => setFilter('high')}
      >
        High Priority
      </button>
      <button
        className={filter === 'medium' ? 'active' : ''}
        onClick={() => setFilter('medium')}
      >
        Medium Priority
      </button>
      <button
        className={filter === 'low' ? 'active' : ''}
        onClick={() => setFilter('low')}
      >
        Low Priority
      </button>
    </div>
  );
}

export default FilterBar;
