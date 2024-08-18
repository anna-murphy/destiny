import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { rollNAndReduce } from "./diceUtils";
import { formatAsCommand } from "../format";

export function rollPbta(modifier: number) {
  return rollNAndReduce(6, 2, {
    reduce: { mode: "select", with: "sum" },
    modifier,
  });
}

export function buildPbtaEmbed(
  result: number,
  dice: number[],
  modifier: number,
) {
  const title =
    result < 7 ? "Failure" : result < 10 ? "Mixed Success" : "Success!";
  const color = result < 7 ? "Red" : result < 10 ? "Yellow" : "Green";
  return new EmbedBuilder()
    .setTitle(title)
    .setColor(color)
    .setDescription(`(${dice.join(" + ")}) + ${modifier} = ${result}`);
}

const PbtaSlashCommand = new SlashCommandBuilder()
  .setName("pbta")
  .setDescription("Makes a Powered by the Apocalypse style roll")
  .addIntegerOption((option) =>
    option
      .setName("modifier")
      .setDescription("A modifier to your roll, usually +/- 3.")
      .setRequired(true),
  ) as SlashCommandBuilder;

async function pbtaHandler(interaction: ChatInputCommandInteraction) {
  const modifier = interaction.options.getInteger("modifier") ?? 0;
  const rollData = rollPbta(modifier);
  const embed = buildPbtaEmbed(rollData.result, rollData.dice, modifier);
  interaction.reply({ embeds: [embed] });
}

export const PbtaCommand = formatAsCommand(PbtaSlashCommand, pbtaHandler);
