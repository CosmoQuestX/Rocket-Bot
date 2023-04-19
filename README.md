# 🚀 Rocket Bot (v2.3.2 Dev)

Check out all the different commands, and maybe make some more. With version 2.3 of Rocket Bot, you can do a lot.

## Introduction

This is a bot built for the CosmoQuest server on Discord, it is a replacement for the CosmoQuest One which was an outdated version of the robot.

## History
The original Rocket Bot was created by CosmoQuest community member Kaio Duarte.
The current version is being maintained primarily by TheRealFakeAdmin and KeeperOfMaps.

### Application Programming Interface (APIs)

🌑 [NASA's APOD](https://apod.nasa.gov/): We use the NASA API to access the full history of Astronomy Picture of The Day

🌒 [Flickr API](https://flickr.com/): Get images from the latest JWST posts.

🌓 [OpenWeatherMap](https://openweathermap.org/): OpenWeatherMap is an API for obtaining weather information

🌔 [AviationWeather.gov](https://aviationweather.gov/): Source for the METAR and TAF data

🌕 [Discord API](https://discord.com/): For everything basically

<!-- Planned -->

<!-- 🌕 Keyv: For saving guild-specific settings -->

<!-- 🌕 Github API: To receive statuses, warnings, and alerts -->

----------------------------------------------------

## Docker Instructions

### Docker - First install

Starting in the `Rocket-Bot` directory

1. `cd CosmoQuestBot-master`

2. Edit `.example-env` using your preferred IDE or text-editor. Fill out all necessary details (`DISCORD_TOKEN`, `NASA_API_KEY`, & `WEATHER_API_KEY`)

    > Try `nano .example-env`

3. After making your changes, save the file as `.env`. 

4. Run `docker build . -t rocket-bot:v2.3.2`



### Docker - Usage instructions

- Run `docker run --name rocket-bot-232 -d rocket-bot:v2.3.2` from anywhere on the system to start the bot
  - To auto-restart after a server reboot, add the tag `--restart always`

  > After the [first install](#docker---first-install), there is no need to run the build command until the next update. All the necessary packages have already been installed.

### Docker - Stopping the container

Eventually you might want to stop the container, run the following commands to accomplish this:

1. `docker ps` displays all running process; locate `rocket-bot:v2.3.2` & note the `Container ID`
    - if it returns no process, you need to change your context by running `docker context list` then `docker context use <context_not_marked_with_*>`
        - run step 1 again

2. `docker stop rocket-bot`

    > After a short time, it should return the Container Name you just entered, this means it stopped successfully.

3. `docker rm <container_id>` (optional)
    - Use this before updating to a new version

----------------------------------------------------

## Configuration

### Options

| Name           | Default | Type           | Description                                                     |
|:---------------|:--------|:---------------|:----------------------------------------------------------------|
| `botName`      | `N/A`   | `<string>`     | The name of the bot [does not need to match username]           |
| `debug`        | `false` | `[bool]`       | Enables debug features.                                         |
| `devId`        | `N/A`   | `[string]`     | User ID of the bot owner.                                       |
| `discord`      | `N/A`   | `<url-string>` | Sets the Discord invite link.                                   |
| `github`       | `N/A`   | `<url-string>` | Sets the GitHub repo link.                                      |
| `throwInvalid` | `false` | `[bool]`       | Toggles the `!<command> is not a valid command.` error message. |
| `version`      | `N/A`   | `<array>`      | Defines the version.                                            |
