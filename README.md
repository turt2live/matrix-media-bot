# matrix-media-bot

[![TravisCI badge](https://travis-ci.org/turt2live/matrix-media-bot.svg?branch=master)](https://travis-ci.org/turt2live/matrix-media-bot)

A small/simple Matrix bot to acquire the MXC URI for media.

Questions? Ask away in [#mediabot:t2bot.io](https://matrix.to/#/#mediabot:t2bot.io)

# Usage

1. Invite [@mediabot:t2bot.io](https://matrix.to/#/@mediabot:t2bot.io) to your room
2. Upload an image

# Building your own

*Note*: You'll need to have an [access token](https://t2bot.io/docs/access_tokens) for an account the bot may use.

1. Clone this repository
2. `npm install`
3. `npm run build`
4. Copy `config/default.yaml` to `config/production.yaml` and edit accordingly
5. Run the bot with `NODE_ENV=prodiction node lib/index.js`

## Docker

```bash
# Create the directory structure for the bot's volume
mkdir -p /matrix-media-bot/config
mkdir -p /matrix-media-bot/logs
mkdir -p /matrix-media-bot/storage

# Create the configuration file. Use the default configuration as a template.
# Logs will automatically be enabled, and the dataPath will be ignored.
nano /matrix-media-bot/config/production.yaml

# Run the container
docker run -v /matrix-media-bot:/data turt2live/matrix-media-bot
```
