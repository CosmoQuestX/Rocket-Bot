# Rocket Bot Changelog

## 2.3.2 (unreleased)

### Future Features

- further improved `!weather` command(s)
  - support for more diverse queries
  - weather forecast command(s)
  - special weather statements & alerts command(s)
  - space weather command(s)

- `!launch` command(s)
  - returns information about rocket launches
  > Hey, isn't that what this bot is made for???

----------------------------------
## 2.3.2 (2023-xx-xx)

### 2.3.2 Changes

- updated `!taf` & `!metar`
  - made [`aviationWeather`](CosmoQuestBot-master/commands/modules/aviationWeather/index.js) more modular
  - small improvements to formatting of `!taf` and `!metar`
  - improved error handling

- `"use strict"` has been enabled in [main.js](CosmoQuestBot-master/main.js)
  - this should not effect any commands
  - please report any bugs or issues in GitHub

- improved [!png](CosmoQuestBot-master/commands/png.js)
  - now using `crypto.randomInt` for better random integer generation [avoids [modulo bias](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modulo_bias)]
  - slightly improved command runtime

### 2.3.2 Features

- added [`!avwx`](CosmoQuestBot-master/commands/avwx.js) command

## 2.3.2 Fixes

- fixed debug permission check in [!help](CosmoQuestBot-master/commands/help.js)
- fixed [!nasa](CosmoQuestBot-master/commands/nasa.js) specified dates not working properly
- fixed [!png](CosmoQuestBot-master/commands/png.js)
- [!taf](CosmoQuestBot-master/commands/taf.js) now uses await for better error handling
  > It is recommended to enable `config.await` for any async command to prevent errors from stopping the bot entirely

## 2.3.1 (2023-04-18)

### 2.3.1 Features

- added formatting to `!taf` & `!metar`

## 2.3.0 (2023-04-04)

### 2.3.0 Changes

- <span style="color:#BD1221;"><b>&#x1F534;[BREAKING]</b></span> updated `npm` to v9 from v8 in [Docker](CosmoQuestBot-master/Dockerfile)

- <span style="color:#BD1221;"><b>&#x1F534;[BREAKING]</b></span> updated [`discordjs`](https://discordjs.guide/additional-info/changes-in-v14.html) to v14 from v13

- added warning to the `npm start` command
  - with Docker working as intended, it is now recommended to only use Docker except for specific situations

### 2.3.0 Features

- added `botName` to [`config.json`](./CosmoQuestBot-master/config.json)[*](./README.md#options)

### 2.3.0 Fixes

- improved commands
  - `!cookie` now works as intended with the limited permissions granted to the bot by default.
  - `!example` was updated to mirror new DiscordJS formats

- fixed commands broken by updating discordjs from v13 to v14
  - new embed class
  - colors can no longer be represented as strings
  - embed timestamps no longer support string date/time

----------------------------------

## 2.2.0 (2022-10-29)

### 2.2.0 Features

- [`main.js`](CosmoQuestBot-master/main.js) has been massively overhauled

- improved weather commands
  - added `km/h` wind value with direction in the [`!weather`](CosmoQuestBot-master/commands/weather.js) command
  - added [`!metar`](CosmoQuestBot-master/commands/metar.js) command
  - added [`!taf`](CosmoQuestBot-master/commands/taf.js) command

- improved [`!nasa`](CosmoQuestBot-master/commands/nasa.js) command
  - optional date parameter
  - new alias (`apod`)

- added [`!png`](CosmoQuestBot-master/commands/png.js) command
- updated [`!about`](CosmoQuestBot-master/commands/about.js) command
- updated [`example.js`](CosmoQuestBot-master/commands/example.js)
- added [`!help`](CosmoQuestBot-master/commands/help.js) command
- added [`!invite`](CosmoQuestBot-master/commands/invite.js) command
- other minor updates <!-- calc, cookie, etc. -->

### 2.2.0 Changes

- removed unused scripts & files

<!-- move this to README or a usage file, CHANGELOG should be brief -->
- updated `config.json`
  - `"throwInvalid": [bool]` toggles the `!<command> is not a valid command.` error message
  - `"github": <url string>` sets the GitHub link used for different commands
  - `"version": <array>` defines different formats of the current version

### 2.2.0 Fixes

- fixed deprecation warnings during install [#5]

### 2.2.0 Security

- updated node packages
- updated to `npm v8` & `Node LTS Gallium`

----------------------------------

## 2.1.2 (2022-08-05)

### 2.1.2 Features

- added `Dockerfile` for containerization; check [here](README.md#docker-instructions) for information on how to use it

- added instructions for running [Docker](README.md#docker-instructions) & npm in `README.md`

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
