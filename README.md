# Rocket Bot (v2.2 Stable)

The Bot of the New generation of explorers for the CosmoQuest server on Discord. Assembled with official APIs and documentation,
and originally created using the Github Students Program tools,
version 2.2 is a substantial overhaul of many of the original Rocket Bot.

Version 2.2 introduces a number of aviation weather commands and other goodies.

## Introduction

This is a bot built for the CosmoQuest server on Discord, it is a replacement for the CosmoQuest One which was an outdated version of the robot.

## Details

> Updated details needed!

<!-- Rocket is a bot that was created using current and stable features. They are:

🌍 Botkit: a handy bot designing tool

🌎 frameworkDiscord.js: a node module for connecting to the Discord API

🌏 Botkit Discord: A connector that allows you to use Bokit and Discord.js

🌍 Uptime Robo and Freshping: A monitoring service that helps keep your bot running 24/7 -->

### Application Programming Interface (APIs)

🌑 Math.js: Extensive math library for JavaScript and Node.js

🌒 NASA API's: Data, images and files from official NASA applications

🌓 OpenWeatherMap: OpenWeatherMap is an API for obtaining weather information

🌔 Discord API: For everything basically

🌕 Keyv: For saving guild-specific settings

<!-- 🌕 Github API: To receive remote warnings and alerts -->

----------------------------------------------------

## Docker Instructions

### Docker - First install

Starting in the `Rocket-Bot` directory

1. `cd CosmoQuestBot-master`

2. Edit `.env` using your preferred IDE or text-editor. Fill out all necessary details (`DISCORD_TOKEN`, `NASA_API_KEY`, & `WEATHER_API_KEY`)

    > `nano .env` is arguably the most user friendly IDE.

3. Run `docker build . -t rocket-bot:v2.2.0`

    > Disregard any deprecation warnings, these are planned to be fixed in future updates.

### Docker - Usage instructions

- Run `docker run --name rocket-bot -d rocket-bot:v2.2.0` from anywhere on the system to start the bot
  - To auto-restart after a server reboot, add the tag `--restart always`

  > After the [first install](#first-install), there is no need to run the build command until the next update. All the necessary packages have already been installed.

### Docker - Stopping the container

Eventually you might want to stop the container, run the following commands to accomplish this:

1. `docker ps` displays all running process; locate `rocket-bot:v2.2.0` & note the `Container ID`
    - if it returns no process, you need to change your context by running `docker context list` then `docker context use <context_not_marked_with_*>`
        - run step 1 again

2. `docker stop rocket-bot`

    > (NOT SURE) After a couple of seconds, it should return the Container ID you just entered, this means it stopped successfully.

3. `docker rm <container_id>` (optional)
    - Use this before updating to a new version

----------------------------------------------------

## NPM instructions

> use node v16.9.1 to install (try [`nvm`](https://www.linode.com/docs/guides/how-to-install-use-node-version-manager-nvm/)); you may use any compatible version (16.9.1) to run it

### NPM - First install

Starting in the `Rocket-Bot` directory

1. `cd CosmoQuestBot-master`

2. Edit `.env` using your preferred IDE or text-editor. Fill out all necessary details (`DISCORD_TOKEN`, `NASA_API_KEY`, & `WEATHER_API_KEY`)

    > `nano .env` is a good option.

3. Run `npm install --omit=dev` to install production-only packages

    > Disregard any deprecation warnings, these are planned to be fixed in future updates.

### NPM - Usage instructions

- Run `npm start` still in the current directory

### NPM - Stopping the process

- use the keyboard shortcut `Ctrl+C` to stop the process
