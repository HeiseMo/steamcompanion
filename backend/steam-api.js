require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/steam/:username', async (req, res) => {
  const username = req.params.username;
  const API_KEY = process.env.REACT_APP_STEAM_API_KEY;

  try {
    const steamResponse = await axios.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${API_KEY}&vanityurl=${username}`);
    res.json(steamResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from the Steam API' });
  }
});

app.get('/api/steam/games/:steamId', async (req, res) => {
  const steamId = req.params.steamId;
  console.log(steamId)
  const API_KEY = process.env.REACT_APP_STEAM_API_KEY;
  try {
    const steamResponse = await axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamId}&include_appinfo=1&format=json`);
    res.json(steamResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from the Steam API' });
  }
});

app.get('/api/steam/user/:steamId', async (req, res) => {
    const steamId = req.params.steamId;
    const API_KEY = process.env.REACT_APP_STEAM_API_KEY;
    try {
      const steamResponse = await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamId}`);
      res.json(steamResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching data from the Steam API' });
    }
  });

app.listen(5000, () => {
    console.log('Server listening on port 5000');
});
