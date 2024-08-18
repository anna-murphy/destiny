import { rollNAndReduce } from "./diceUtils";
import { formatAsCommand } from "../format";
import {
  APIEmbedField,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

const ADVANTAGE_OPTIONS = [
  "+4",
  "+3",
  "+2",
  "+1",
  "+0",
  "0",
  "-0",
  "-1",
  "-2",
  "-3",
  "-4",
] as const;
type AdvantageOption = (typeof ADVANTAGE_OPTIONS)[number];
const CONFIDENCE_OPTIONS = ["confidence", "neutral", "desparation"] as const;
type ConfidenceOption = (typeof CONFIDENCE_OPTIONS)[number];

const parseAdvantageModifier = (adv: AdvantageOption) =>
  isNaN(Number(adv)) ? 0 : Number(adv);

export function rollAAA(
  modifier: number,
  advantage: AdvantageOption,
  confidence: ConfidenceOption,
) {
  const advMofidier = parseAdvantageModifier(advantage);
  return rollNAndReduce(6, Math.abs(advMofidier) + 2, {
    cast:
      confidence === "neutral"
        ? []
        : confidence === "confidence"
          ? [{ rolled: 1, into: 6 }]
          : [{ rolled: 6, into: 1 }],
    select:
      advMofidier === 0
        ? undefined
        : advMofidier > 0
          ? { mode: "keep", keep: 2, direction: "highest" }
          : { mode: "keep", keep: 2, direction: "lowest" },
    reduce: { mode: "select", with: "sum" },
    modifier,
  });
}

const AaaSlashCommand = new SlashCommandBuilder()
  .setName("aaa")
  .setDescription("Makes a roll for Armor Astir: Advent")
  .addIntegerOption((option) =>
    option
      .setName("modifier")
      .setDescription("A modifier to your roll, usually +/- 3.")
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName("advantage")
      .setDescription("Modify the number of dice you roll.")
      .addChoices(
        ...ADVANTAGE_OPTIONS.map((opt) => ({ name: opt, value: opt })),
      ),
  )
  .addStringOption((option) =>
    option
      .setName("confidence")
      .setDescription("Modify the values of the dice you roll.")
      .addChoices(
        ...CONFIDENCE_OPTIONS.map((opt) => ({ name: opt, value: opt })),
      ),
  );

async function aaaHandler(interaction: ChatInputCommandInteraction) {
  const modifier = interaction.options.getInteger("modifier") ?? 0;
  const advantage = (interaction.options.getString("advantage") ??
    "0") as AdvantageOption;
  const confidence = (interaction.options.getString("confidence") ??
    "neutral") as ConfidenceOption;
  const rollData = rollAAA(modifier, advantage, confidence);
  const embed = buildAaaEmbed(
    rollData.result,
    rollData.dice,
    modifier,
    advantage,
    confidence,
  );
  interaction.reply({ embeds: [embed] });
}

export function buildAaaEmbed(
  result: number,
  dice: number[],
  modifier: number,
  advantage: AdvantageOption,
  confidence: ConfidenceOption,
) {
  const advModifier = parseAdvantageModifier(advantage);
  const title =
    result < 7 ? "Failure" : result < 10 ? "Mixed Success" : "Success!";
  const color = result < 7 ? "Red" : result < 10 ? "Yellow" : "Green";
  const fields: APIEmbedField[] = [];
  if (confidence !== "neutral")
    fields.push({
      name: confidence,
      value: confidence === "confidence" ? "⬆️" : "⬇️",
      inline: true,
    });
  if (advModifier !== 0)
    fields.push({
      name: `${advModifier > 0 ? "Advantage" : "Disadvantage"} (${advModifier})`,
      value: Array(Math.abs(advModifier) + 1).join(
        advModifier > 0 ? "⬆️" : "⬇️",
      ),
      inline: true,
    });
  return new EmbedBuilder()
    .setTitle(title)
    .setColor(color)
    .addFields(...fields)
    .setDescription(
      modifier === 0
        ? `${dice.join(" + ")} = ${result}`
        : `(${dice.join(" + ")}) ${modifier > 0 ? "+" : "-"} ${Math.abs(modifier)} = ${result}`,
    );
}

export const AaaCommand = formatAsCommand(
  AaaSlashCommand as SlashCommandBuilder,
  aaaHandler,
);
