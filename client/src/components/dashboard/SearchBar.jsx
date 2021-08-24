import React from 'react';
import '../../styles/dashboard.css';

function SearchBar() {
  return (
    <div>
      <div className="input-group rounded">
        <div className="form-outline">
          <input type="search" id="form1" className="form-control rounded search-form" placeholder="Search" />
        </div>
        <button type="button" className="btn rounded ms-1 search-btn">
          <i className="fas fa-search" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
