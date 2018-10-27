import { AutojoinRoomsMixin, MatrixClient, SimpleRetryJoinStrategy } from "matrix-bot-sdk";
import config from "./config";
import { LocalstorageStorageProvider } from "./LocalstorageStorageProvider";
import { LogService } from "matrix-js-snippets";
import * as striptags from "striptags";

LogService.configure(config.logging);
const storageProvider = new LocalstorageStorageProvider(config.dataPath);
const client = new MatrixClient(config.homeserverUrl, config.accessToken, storageProvider);

AutojoinRoomsMixin.setupOnClient(client);
client.setJoinStrategy(new SimpleRetryJoinStrategy());

async function finishInit() {
    const userId = await client.getUserId();
    LogService.info("index", "Media bot logged in as " + userId);

    client.on("room.message", (roomId, event) => {
        if (event['sender'] === userId) return;
        if (event['type'] !== "m.room.message") return;
        if (!event['content']) return;
        if (!event["content"]["url"] || !event["content"]["url"].startsWith("mxc://")) return;

        const html = `MXC URI: <code>${event["content"]["url"]}</code>`;
        client.sendMessage(roomId, {
            msgtype: "m.notice",
            body: striptags(html),
            format: "org.matrix.custom.html",
            formatted_body: html,
        });
    });

    return client.start();
}

finishInit().then(() => LogService.info("index", "Media bot started!"));
