import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [hotDogs, setHotDogs] = useState([]);
  const [newHotDog, setNewHotDog] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const savedHotDogs = localStorage.getItem('hotDogs');
    if (savedHotDogs) {
      setHotDogs(JSON.parse(savedHotDogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hotDogs', JSON.stringify(hotDogs));
  }, [hotDogs]);

  const addHotDog = () => {
    if (newHotDog.trim()) {
      setHotDogs([...hotDogs, { name: newHotDog, sold: false }]);
      setNewHotDog('');
    }
  };

  const toggleSold = (index) => {
    const updatedHotDogs = hotDogs.map((hotDog, i) =>
      i === index ? { ...hotDog, sold: !hotDog.sold } : hotDog
    );
    setHotDogs(updatedHotDogs);
  };

  const removeHotDog = (index) => {
    const updatedHotDogs = hotDogs.filter((_, i) => i !== index);
    setHotDogs(updatedHotDogs);
  };

  const filteredHotDogs = hotDogs.filter(hotDog => {
    if (filter === 'Sold') return hotDog.sold;
    if (filter === 'Available') return !hotDog.sold;
    return true;
  });

  const availableHotDogs = hotDogs.filter(hotDog => !hotDog.sold).length;

  return (
    <div className="app">
      <h1>Hot Dog Inventory</h1>
      
      <div className="add-hotdog">
        <input
          type="text"
          value={newHotDog}
          onChange={(e) => setNewHotDog(e.target.value)}
          placeholder="Enter hot dog name"
        />
        <button onClick={addHotDog}>Add Hot Dog</button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Available')}>Available</button>
        <button onClick={() => setFilter('Sold')}>Sold</button>
      </div>

      <InventoryCounter count={availableHotDogs} />

      <HotDogList
        hotDogs={filteredHotDogs}
        toggleSold={toggleSold}
        removeHotDog={removeHotDog}
      />
    </div>
  );
};

const HotDogList = ({ hotDogs, toggleSold, removeHotDog }) => (
  <ul>
    {hotDogs.length === 0 ? (
      <li>No hot dogs in inventory</li>
    ) : (
      hotDogs.map((hotDog, index) => (
        <li key={index} className={hotDog.sold ? 'sold' : ''}>
          <input
            type="checkbox"
            checked={hotDog.sold}
            onChange={() => toggleSold(index)}
          />
          {hotDog.name}
          <button onClick={() => removeHotDog(index)}>Remove</button>
        </li>
      ))
    )}
  </ul>
);

const InventoryCounter = ({ count }) => (
  <div className="inventory-counter">
    <h2>Total Available: {count}</h2>
  </div>
);

export default App;