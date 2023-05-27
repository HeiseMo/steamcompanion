import React from 'react';
//<img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}></img>
function ResultsComponent({ games }) {
  if (!games || games.length === 0) {
    return <div>No common games found.</div>;
  }

  return (
    <div className='resultsContainer'>
        <div className='gameBox'>{games.map(game => (
            console.log(game),
          <div className='gameInfo' key={game.appid}>
            <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}></img>
            </div>
        ))}</div>
    </div>
  );
}

export default ResultsComponent;