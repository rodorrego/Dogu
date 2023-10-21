import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const TOKEN =
  "MTE2NTEwMzI0MjM4MDg1MzMyMg.GWZnTk.2yHQ6_CmzRddEDI4yCzCvFRs-9flPXXmqsN1ZU";

client.login(TOKEN);
