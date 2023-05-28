import React, { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import { findCommonGames } from './connectors/Api';

function App() {
  const [games, setGames] = useState(null);

  const handleSearch = async (players) => {
    const commonGames = await findCommonGames(players);
    setGames(commonGames);
  };

  return (
    <div className="App">
      <p>Steam Common Game Finder</p>
      <Search onSubmit={handleSearch} />
      <Results games={games} />
    </div>
  );
}

export default App;
