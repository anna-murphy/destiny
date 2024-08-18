import {
  ChatInputCommandInteraction,
  Collection,
  REST,
  Routes,
} from "discord.js";

import { Command } from "./format";
import { PingCommand } from "./ping";
import { PbtaCommand, AaaCommand, AaaHelpCommand } from "./roll";

export { Command } from "./format";

export const COMMANDS = new Collection<string, Command>([
  [PingCommand.data.name, PingCommand],
  [PbtaCommand.data.name, PbtaCommand],
  [AaaCommand.data.name, AaaCommand],
  [AaaHelpCommand.data.name, AaaHelpCommand],
]);

/**
 * Wrapper to simplify command fetching.
 * @param commandName
 */
export function getCommandForCommandName(commandName: string): Command {
  const command = COMMANDS.get(commandName);
  if (!command) throw new Error(`No command "${commandName}" found`);
  return command;
}

/**
 * Handler to execute a specific action as prompted by the user.
 * @param interaction
 */
export async function handleCommand(interaction: ChatInputCommandInteraction) {
  try {
    const command = getCommandForCommandName(interaction.commandName);
    await command.execute(interaction);
  } catch (ex) {
    console.error(
      `An error was thrown during execution of "${interaction.commandName}": ${ex}`,
    );
    interaction.reply({
      content: `Sorry, something went wrong trying to perform this task. Try again later?`,
      ephemeral: true,
    });
  }
}

/**
 * Helper function to sync commands with a specific guild.
 * @param token
 * @param clientId
 * @param guildId
 */
export async function initializeCommandsWithGuild(
  token: string,
  clientId: string,
  guildId: string,
) {
  const rest = new REST().setToken(token);
  try {
    console.log(
      `Started refreshing ${COMMANDS.size} application (/) commands.`,
    );

    COMMANDS.mapValues((command) => console.log(command.data.toJSON()));

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: COMMANDS.mapValues((command) => command.data.toJSON()) },
    );

    console.log(`Successfully reloaded ${data} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
}
