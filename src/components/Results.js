import React from 'react';

function ResultsComponent({ games }) {
  if (!games || games.length === 0) {
    return <div>No common games found.</div>;
  }

  return (
    <div className='resultsContainer'>
        <div className='gameBox'>{games.map(game => (
            console.log(game),
          <div className='gameInfo' key={game.appid}>
            <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}></img>
            <div>{game.name}</div>
            </div>
        ))}</div>
    </div>
  );
}

export default ResultsComponent;