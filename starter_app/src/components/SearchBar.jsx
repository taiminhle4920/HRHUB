import React, { useState } from 'react';

function SearchBar() {
    const [employeename, setEmployeename] = useState('');

    const handleSearch = async () => {
        const response = await fetch(`http://localhost:8080/searchuser?employeename=${employeename}`);

        const data = await response.json();
        console.log(data); // do something with the search results
    };

    return (
        <div>
            <input type="text" value={employeename} onChange={(e) => setEmployeename(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
