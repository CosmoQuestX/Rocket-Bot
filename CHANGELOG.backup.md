# Rocket Bot Changelog

## 2.2.0 (unreleased)

### 2.2.0 Features

- added `km/h` wind value with direction

### 2.2.0 Changes

- removed the `!<command> is not a valid command.` error message *as requested*

-

### 2.2.0 Fixes

-

### 2.2.0 Security Fixes

-

-------------------------------------

### 2.2.0 Proposed Security Fixes

- possible update to `npm v8.11.0` & `node v16 LTS`

### 2.2.0 Proposed Features

- improved `!weather` command(s)
  - support for more diverse queries
  - `METAR` & `TAF` command(s)
  - weather forecast command(s)
  - special weather statements & alerts command(s)
  - space weather command(s)

-------------------------------------

## 2.1.2 (2022-08-05)

### 2.1.2 Features

- added `Dockerfile` for containerization; check [here](README.md#docker-instructions) for information on how to use it

- added instructions for running [Docker](README.md#docker-instructions) & [npm](README.md#npm-instructions) in `README.md`

### 2.1.2 Fixes

- fixed `package.json` & `package-lock.json`; `npm install` should work with no issue (disregard deprecation warnings)
  - pruned `uwebsockets.js` to stop fatal install errors

- updated `CHANGELOG.md` to follow the markdown standard
  - fixed all "duplicate heading level 3" errors

## 2.1.1 (2022-08-01)

### 2.1.1 Fixes

- DMs are no longer monitored
- the `!weather` command embed now links to the location's webpage
- the `!weather` command section `wind gust` now shows the unit of measurement [m/s]
- the `!weather` command no longer shows sections with no value (excluding description)
- added asynchronous log/debug/warn/error for improved response times - *questionably effective*
- improved error handling
- improved code formatting consistency
- other minor fixes & small improvements

## 2.1.0 (2022-07-29)

### 2.1.0 Fixes

- Discord bot `token` is now stored in the `.env` file  located in `./CosmoQuestBot-master/`; enter it after `DISCORD_TOKEN=`
  - Example: `DISCORD_TOKEN="937it3ow87i4ery69876wqire"`

- changed weather API from `weather-js (weather.service.msn.com)` to `api.openweathermap.org`
  1. create an account [here](https://home.openweathermap.org/users/sign_up) to receive your API key via email
  2. store the API key in the `.env` file located in `./CosmoQuestBot-master/`; enter it after `WEATHER_API_KEY=`
      - Example: `WEATHER_API_KEY="bb5832afe13cefbd2bb1ad78a0200875"`

- "This city doesn't exist." bot message when running `!weather` command should happen less often; use the format `!weather <city name>, <US state name [optional]>, <country as alpha-2 (ISO 3166)>` for best results

- improved error handling & bot error messages

- improved the `!say` command to allow for anyone with the `ADMINISTRATOR` permission to send a message as the bot

- improved the `!ping` command to report more information [API, Upload, & Download latency]

### 2.1.0 Security

- removed Discord bot `token` from `config.json` located in `./CosmoQuestBot-master/`; check under Fixes for more information