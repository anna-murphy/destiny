/*import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import {
  AdvantageOption,
  ConfidenceOption,
  MOVES,
  MOVE_NAMES,
  addRollOpts,
  rollAAA,
} from "./constants";
import { formatAsCommand } from "../../format";

const aaaFullSlashCommandWithoutMoves = new SlashCommandBuilder()
  .setName("aaatest")
  .setDescription("Makes a roll for Armor Astir: Advent")
  .addSubcommand((help) =>
    help
      .setName("help")
      .setDescription("Get info about a specific move")
      .addStringOption((moveName) =>
        moveName
          .setName("move")
          .setDescription("The move you want info about")
          .setRequired(true)
          .addChoices(
            ...Object.entries(MOVES).map(([value, name]) => ({ name, value })),
          ),
      ),
  )
  .addSubcommand((command) =>
    addRollOpts(
      command
        .setName("roll")
        .setDescription("Make a roll without a specific move"),
    ),
  );

const aaaFullSlashCommand = MOVE_NAMES.reduce(
  (newCommand, moveName) =>
    newCommand.addSubcommand((subCommand) =>
      addRollOpts(
        subCommand
          .setName(moveName.toLowerCase().replace(/ /g, "-"))
          .setDescription(`Make a ${moveName} move`),
      ),
    ),
  aaaFullSlashCommandWithoutMoves,
);

async function stubHandler(interaction: ChatInputCommandInteraction) {
  const modifier = interaction.options.getInteger("modifier") ?? 0;
  const advantage = (interaction.options.getString("advantage") ??
    "0") as AdvantageOption;
  const confidence = (interaction.options.getString("confidence") ??
    "neutral") as ConfidenceOption;
  const rollData = rollAAA(modifier, advantage, confidence);
  interaction.reply(
    `${interaction.commandName} ${interaction.options.getSubcommand()}`,
  );
}

export const AaaTestCommand = formatAsCommand(
  aaaFullSlashCommand as SlashCommandBuilder,
  stubHandler,
);
*/
export * from "./help";
