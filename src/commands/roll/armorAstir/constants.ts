import { SlashCommandSubcommandBuilder } from "discord.js";
import { rollNAndReduce } from "../diceUtils";

export const MOVES = {
  WEATHER_THE_STORM: "Weather the Storm",
  READ_THE_ROOM: "Read the Room",
  EXCHANGE_BLOWS: "Exchange Blows",
  DISPEL_UNCERTAINTIES: "Dispel Uncertainties",
  STRIKE_DECISIVELY: "Strike Decisively",
  COOL_OFF: "Cool Off",
  HEAT_UP: "Heat Up",
  BITE_THE_DUST: "Bite the Dust",
  HELP_OR_HINDER: "Help or Hinder",
  WEAVE_MAGIC: "Weave Magic",
  LEAD_A_SORTIE: "Lead a Sortie",
  SUBSYSTEMS: "Subsystems",
  B_PLOT: "B-Plot",
} as const;
export type MoveNameKey = keyof typeof MOVES;
export type MoveName = (typeof MOVES)[keyof typeof MOVES];
export const MOVE_NAME_KEYS = Object.keys(MOVES) as MoveNameKey[];
export const MOVE_NAMES = Object.values(MOVES) as MoveName[];

export const ADVANTAGE_OPTIONS = [
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
export type AdvantageOption = (typeof ADVANTAGE_OPTIONS)[number];
export const CONFIDENCE_OPTIONS = [
  "confidence",
  "neutral",
  "desparation",
] as const;
export type ConfidenceOption = (typeof CONFIDENCE_OPTIONS)[number];

export function parseAdvantageModifier(adv: AdvantageOption) {
  return isNaN(Number(adv)) ? 0 : Number(adv);
}

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

export function addRollOpts(command: SlashCommandSubcommandBuilder) {
  return command
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
}
