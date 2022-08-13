# Nightly Notes

## Notes

- anyone is free to make improvements and create a pull request with the proposed changes; keep these pull request focused on a single improvement & preferably linked to an active issue to simplify the review process

- when using the console to poke/check functionality, use `debug` as accidentally keeping it in the code will not do anything when `debug` in `config.json` is not set to `true`
  - **DON'T USE `console.[log/debug/warn/error]`** as `public/async-logs` has more functionality

## Debug Options

- `config.json` *(these are all optional & off by default)*
  - `"debug": true` for more console logging & to enable the debug function
  - `"channelId": "CHANNEL_ID"` for testing the NASA function
  - `"userId": "USER_ID"` allows this user to use debug commands (like `!help <command> debug`), this is unnecessary if they have `ADMINISTRATOR` permission

- `nodemon` is being used for quick development, the config can be found in `dev/nodemon.json`; do not use `--omit=dev` when installing to include nodemon
  - run the command `npm run dev` to restart the bot after every edit; you may exclude files & folders from causing restarts by editing `dev/nodemon.json`

## In-Dev Things

- `commands/geolocate` command & `commands/modules/geocodeMapSearch`
  - uncomment any debug to get information on the output

- `commands/help` is working with minimal features, this will be improved
  - wildcard/no-argument `!help` has not been implemented yet, you must specify a command (Ex: `!help about`)
  - use `debug` as the second argument when using the command to get it's configuration details (Ex: `!help about debug`)

- permission checks should be performed in `main` & the current `conf.permLevel` & `conf.guildOnly` have no real meaning; A new system needs to be created

- `commands/example` is incomplete but still a good start for learning

- `main` loads commands sequentially, this should be changed to async
  - unknown if the current `async` is functional
  - this ties into the `!help` command
