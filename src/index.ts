import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { initializeCommandsWithGuild, handleCommand } from "./commands";

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
  console.error(`Failed to find bot secrets.`);
  process.exit(-1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

/**
 * Handle Bot Interactions
 */
client.on(Events.InteractionCreate, async (interaction) => {
  console.log(interaction);
  if (interaction.isChatInputCommand()) await handleCommand(interaction);
});

initializeCommandsWithGuild(DISCORD_TOKEN, CLIENT_ID, GUILD_ID);

client.login(DISCORD_TOKEN);
