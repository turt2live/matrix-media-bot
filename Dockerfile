FROM node:alpine
COPY . /tmp/src
WORKDIR /tmp/src
RUN apk add --no-cache -t build-deps make gcc g++ python ca-certificates libc-dev wget git \
    && npm install \
    && npm run build \
    && mv lib/ /matrix-image-bot/ \
    && mv node_modules / \
    && cd / \
    && rm -rf /tmp/* \
    && apk del build-deps

WORKDIR /

ENV NODE_ENV=production
ENV NODE_CONFIG_DIR=/data/config

# We want to make sure that the user can't configure these wrong
ENV BOT_DATA_PATH=/data/storage
ENV BOT_DOCKER_LOGS=true

VOLUME ["/data"]
CMD node /matrix-image-bot/index.js
