# Rocket Bot (v2.2 Stable)

The Bot of the New generation of explorers for the CosmoQuest server on Discord. Assembled with official APIs and documentation,
and originally created using the Github Students Program tools,
version 2.2 is a substantial overhaul of much of the original Rocket Bot.

Version 2.2 introduces a number of aviation weather commands and other goodies.

## Introduction

This is a bot built for the CosmoQuest server on Discord, it is a replacement for the CosmoQuest One which was an outdated version of the robot.

## Details

> Updated details needed!

<!-- Rocket is a bot that was created using current and stable features. They are: -->

<!-- 🌍 Math.js: Extensive math library for JavaScript and Node.js

🌎 SOMETHING

🌏 SOMETHING

🌍 SOMETHING -->

### Application Programming Interface (APIs)

🌑 NASA's APOD: We use the NASA API to access the full history of Astronomy Picture of The Day

🌒 FLIKr API: Get images from the latest JWST posts.

🌓 OpenWeatherMap: OpenWeatherMap is an API for obtaining weather information

🌔 Discord API: For everything basically

<!-- Planned -->

<!-- 🌕 Keyv: For saving guild-specific settings -->

<!-- 🌕 Github API: To receive statuses, warnings, and alerts -->

----------------------------------------------------

## Docker Instructions

### Docker - First install

Starting in the `Rocket-Bot` directory

1. `cd CosmoQuestBot-master`

2. Edit `.env` using your preferred IDE or text-editor. Fill out all necessary details (`DISCORD_TOKEN`, `NASA_API_KEY`, & `WEATHER_API_KEY`)

    > Try `nano .env`

3. Run `docker build . -t rocket-bot:v2.2.0`

    > Disregard any deprecation warnings, these are planned to be fixed in future updates.

### Docker - Usage instructions

- Run `docker run --name rocket-bot -d rocket-bot:v2.2.0` from anywhere on the system to start the bot
  - To auto-restart after a server reboot, add the tag `--restart always`

  > After the [first install](#docker---first-install), there is no need to run the build command until the next update. All the necessary packages have already been installed.

### Docker - Stopping the container

Eventually you might want to stop the container, run the following commands to accomplish this:

1. `docker ps` displays all running process; locate `rocket-bot:v2.2.0` & note the `Container ID`
    - if it returns no process, you need to change your context by running `docker context list` then `docker context use <context_not_marked_with_*>`
        - run step 1 again

2. `docker stop rocket-bot`

    > After a short time, it should return the Container Name you just entered, this means it stopped successfully.

3. `docker rm <container_id>` (optional)
    - Use this before updating to a new version

----------------------------------------------------

## Configuration

### Options

|Name           |Default    |Type   |Description        |
|:--------------|:----------|:------|:------------------|
|`throwInvalid` |`false`    |`[bool]` |Toggles the `!<command> is not a valid command.` error message.
|`github`       |`N/A`      |`<url-string>` |Sets the GitHub repo link.
|`discord`      |`N/A`      |`<url-string>` |Sets the Discord invite link.
|`version`      |`N/A`      |`<array>`      |Defines the version
|`debug`        |`false`    |`[bool]`       |Enables debug features.