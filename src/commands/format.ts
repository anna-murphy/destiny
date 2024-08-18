import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export type CommandData = SlashCommandBuilder;
export type CommandExecute = (interaction: ChatInputCommandInteraction) => void;

export type Command = {
  data: CommandData;
  execute: CommandExecute;
};

export function formatAsCommand(
  data: CommandData,
  execute: CommandExecute,
): Command {
  return { data, execute } as Command;
}
