# Rocket Bot (v2.1 Stable)

The Bot of the New generation of explorers for the CosmoQuest server on Discord. Assembled with official APIs and documentation, created using the Github Students Program tools.

## Introduction

This is a bot built for the CosmoQuest server on Discord, it is a replacement for the CosmoQuest One which was an outdated version of the robot.

## Details

Rocket is a bot that was created using current and stable features. They are:

🌍 Botkit: a handy bot designing tool

🌎 frameworkDiscord.js: a node module for connecting to the Discord API

🌏 Botkit Discord: A connector that allows you to use Bokit and Discord.js

🌍 Uptime Robo and Freshping: A monitoring service that helps keep your bot running 24/7

### Application Programming Interface (APIs)

🌑 Math.js: extensive math library for JavaScript and Node.js

🌒 NASA API's: Data, images and files from official NASA applications

🌓 OpenWeatherMap: OpenWeatherMap is an API for obtaining weather information

🌔 Discord API: For everything basically

🌕 Github API: To receive remote warnings and alerts

----------------------------------------------------

## Docker Instructions

### Docker - First install

Starting in the `Rocket-Bot` directory

1. `cd CosmoQuestBot-master`

2. Edit `.env` using your preferred IDE or text-editor. Fill out all necessary details (`DISCORD_TOKEN` & `WEATHER_API_KEY`)

    > `nano .env` is arguably the most user friendly IDE.

3. Run `docker build . -t rocket-bot:v2.1.2`

    > Disregard any deprecation warnings, these are planned to be fixed in future updates.

### Docker - Usage instructions

- Run `docker run -d rocket-bot:v2.1.2` from anywhere on the system to start the bot

    > After the [first install](#first-install), there is no need to run the build command until the next update. All the necessary packages have already been installed.

### Docker - Stopping the container

Eventually you might want to stop the container, run the following commands to accomplish this:

1. `docker ps` displays all running process; locate `rocket-bot:v2.1.2` & note the `Container ID`
    - if it returns no process, you need to change your context by running `docker context list` then `docker context use <context_not_marked_with_*>`
        - run step 1 again

2. `docker stop <container_id>`

    > After a couple of seconds, it should return the Container ID you just entered, this means it stopped successfully.

----------------------------------------------------

## NPM instructions

### npm - First install

Starting in the `Rocket-Bot` directory

1. `cd CosmoQuestBot-master`

2. Edit `.env` using your preferred IDE or text-editor. Fill out all necessary details (`DISCORD_TOKEN` & `WEATHER_API_KEY`)

    > `nano .env` is arguably the most user friendly IDE.

3. Run `npm install --omit=dev` to install production-only packages

    > Disregard any deprecation warnings, these are planned to be fixed in future updates.

### npm - Usage instructions

- Run `npm start` still in the current directory

### npm - Stopping the process

- use the keyboard shortcut `Ctrl+C` to stop the process