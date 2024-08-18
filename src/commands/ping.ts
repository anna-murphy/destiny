import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { formatAsCommand } from "./format";

const PingSlashCommand = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies to the user with a 'pong' message.");

const pongEmbed = new EmbedBuilder().setTitle("Pong!").setColor("Green");

async function pingHandler(interaction: ChatInputCommandInteraction) {
  interaction.reply({ embeds: [pongEmbed] });
}

export const PingCommand = formatAsCommand(PingSlashCommand, pingHandler);
