import {
  APIEmbedField,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { formatAsCommand } from "../../format";
import { MOVES, MoveNameKey, getMoveText, isMoveNameKey } from "./moveData";

const aaaHelpCommand = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Get info about a specific move for Armor Astir: Advent")
  .addStringOption((moveName) =>
    moveName
      .setName("move")
      .setDescription("The move you want info about")
      .setRequired(true)
      .addChoices(
        ...Object.entries(MOVES).map(([value, name]) => ({ name, value })),
      ),
  );

function buildHelpEmbed(moveNameKey: MoveNameKey, moveText: string) {
  const moveName = MOVES[moveNameKey];
  const fields: APIEmbedField[] = [
    {
      name: moveName,
      value: moveText,
    },
  ];
  return new EmbedBuilder()
    .setTitle(moveName)
    .setColor("Green")
    .addFields(...fields);
}

async function helpCommandHandler(interaction: ChatInputCommandInteraction) {
  const moveName = interaction.options.getString("move");
  if (!moveName) {
    return interaction.reply({
      ephemeral: true,
      content: `It doesn't look like you entered a command. Try again?`,
    });
  }
  try {
    if (isMoveNameKey(moveName)) {
      const moveText = getMoveText(moveName);
      return interaction.reply({
        embeds: [buildHelpEmbed(moveName, moveText)],
      });
    } else throw new Error(`Unrecognized move name ${moveName}`);
  } catch (ex) {
    return interaction.reply({
      ephemeral: true,
      content: `I didn't recognize the move "${moveName}". Did you spell that correctly?`,
    });
  }
}

export const AaaHelpCommand = formatAsCommand(
  aaaHelpCommand as SlashCommandBuilder,
  helpCommandHandler,
);
