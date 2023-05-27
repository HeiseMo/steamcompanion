import React, { useState } from 'react';

function Search({ onSubmit }) {
  const [name, setName] = useState('');
  const [namesList, setNamesList] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddName = () => {
    if (name.trim() !== '') {
      setNamesList([...namesList, name]);
      setName('');
    }
  };

  const handleDeleteName = (index) => {
    const updatedList = [...namesList];
    updatedList.splice(index, 1);
    setNamesList(updatedList);
  };

  const handleSubmit = () => {
    onSubmit(namesList.join(','));
  };

  return (
    <div className='searchContainer'>
      <div className="inputContainer">
        <input type="text" value={name} onChange={handleNameChange} />
        <button onClick={handleAddName}>Add</button>
      </div>
      <div className="namesContainer">
        {namesList.map((name, index) => (
          <div className="nameTag" key={index}>
            {name}
            <button onClick={() => handleDeleteName(index)}>X</button>
          </div>
        ))}
      </div>
      <button className='searchButton' onClick={handleSubmit}>Search</button>
    </div>
  );
}

export default Search;
