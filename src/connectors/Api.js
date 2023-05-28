import axios from 'axios';

// Get a user's Steam ID
export async function getSteamId(input) {
  // Check if the input is an object with a 'steamid' property
  if (Array.isArray(input) && input[0] && input[0].hasOwnProperty('steamid')) {
    return input[0].steamid;
  }

  // The input is a username (Vanity URL)
  const response = await axios.get(`http://localhost:5000/api/steam/${input}`);
  
  return response.data.response.steamid;
}

// Get all user information
export async function getUserInfo(steamId) {
  if (isNaN(steamId)) {
    const isNotaNum = await getSteamId(steamId);  // Await directly on the promise returned by getSteamId
    const response = await axios.get(`http://localhost:5000/api/steam/user/${isNotaNum}`);
    return response.data.response;
  }
  const response = await axios.get(`http://localhost:5000/api/steam/user/${steamId}`);
  return response.data.response;
}

// Get the games a user owns
async function getOwnedGames(steamId) {
  console.log(steamId, "checking owned game steamid")
  const response = await axios.get(`http://localhost:5000/api/steam/games/${steamId}`);
  console.log(response, "ownedgame responce")
  return response.data.response.games;
}

// Find games two users both own
export async function findCommonGames(usernames) {
  const usernamesArray = Array.isArray(usernames) ? usernames : usernames.split(',');
  console.log(usernamesArray, "first step of usernamesArray")
  
  const steamIds = await Promise.all(
    usernamesArray.map(userArray => getSteamId(userArray))
  );

  console.log(steamIds, 'steam ids')
  
  const ownedGames = await Promise.all(steamIds.map(steamId => getOwnedGames(steamId)));

// Calculate intersection and include playtime_forever
const commonGames = ownedGames.reduce((common, games) => {
  return common.map(game => {
    // find the matching game in the second list to get its playtime
    const game2 = games.find(g => g.appid === game.appid);
    return game2 ? { ...game, playtime_forever: game2.playtime_forever } : game;
  }).filter(game => games.some(game2 => game2.appid === game.appid));
}, ownedGames[0]);

// Sort games by playtime, in descending order
commonGames.sort((a, b) => b.playtime_forever - a.playtime_forever);

  return commonGames;
}