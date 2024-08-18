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
  PLAN_AND_PREPARE: "Plan and Prepare",
} as const;
export type MoveNameKey = keyof typeof MOVES;
export type MoveName = (typeof MOVES)[keyof typeof MOVES];
export const MOVE_NAME_KEYS = Object.keys(MOVES) as MoveNameKey[];
export const MOVE_NAMES = Object.values(MOVES) as MoveName[];

const WEATHER_THE_STORM = `When you weather the storm to do something safely under pressure, roll:
  
- +DEFY to dodge, tough it out or strong-arm your way through.
- +KNOW to make it through with quick thinking or the ace up your sleeve.
- +SENSE to notice quiet cues, signs of danger or bad vibes before it's too late.

On a 10+, you manage to make it to safety.

On a 7-9, you succeed but at some cost: it'll keep you occupied longer than you thought, the Director will ask you to make a difficult choice, or you'll burn a point of Spotlight as you take dramatic action.`;

const READ_THE_ROOM = `When you read the room to get insight on your situation, roll +SENSE; On a 10+, hold 3. On a 7-9, hold 1, and spend it 1-for-1 to ask the following questions. Your hold lasts until you leave the current situation or it changes significantly.

- Who has the upper hand here?
- What is being overlooked or obscured here?
- Where do my Hooks pull me here?
- How does x really feel?
- What is x's **approach**?
- How is x at *risk* or in *peril*?
- Where can I find x?

On a failure, you may ask one of the above questions immediately, but the answer creates a problem or puts you in danger.

Roll with **advantage** when you act on the answers to what you've asked.`;

const EXCHANGE_BLOWS = `When you ***exchange blows*** with foes capable of defending themselves, roll +CLASH or +TALK, whichever is more appropriate, and advance a GRAVITY clock if you have one;

On a 10+, either your opponent takes a risk, or you take a risk and put your opponent in peril.

On a 7-9, both you and your target are forced to take a risk.`;

const DISPEL_UNCERTAINTIES = `When you ***dispel uncertainties*** by clarifying the unknown or answering a question, roll +KNOW;

On a 10+, the Director will tell you something directly useful you know about the situation or subject at hand.

On a 7-9, the Director will tell you something potentially useful, but it is up to you to discern how. The Director might ask you to explain how you know that information, or where you learned it.`;

const STRIKE_DECISIVELY = `When you ***strike decisively*** against someone who is defenceless, roll +CLASH or +TALK, whichever is more appropriate;

On a 10+, you strike true. Director characters are killed, forced to retreat or otherwise removed as a threat as per the fiction. Player characters should bite the dust.

On a 7-9, you succeed as above, but choose 1;

- You overreach or underestimate—take a *risk*.
- You waste ammo or words, losing use a weapon until you can re-arm, or losing the weight of some bargaining chip or piece of leverage.
- You strike carelessly, causing collateral damage beyond your expectations.`;

const COOL_OFF = `When you take a moment in safety to ***cool off*** or help someone else do the same, declare a risk you want to get rid of and roll whatever Trait seems most appropriate;

On a 10+, you/they erase a risk or untick '*overheating*' from an Astir.

On a 7-9, as above, but your moment of safety is interrupted.`;

const HEAT_UP = `When you push your Astir to its limits and start to ***heat up***, you may tick '*overheating*' to retry a roll. The original results are discarded, and you must take the second roll even if it's worse.`;

const BITE_THE_DUST = `When you're caught defenceless or risk harm so severe you might ***bite the dust***, roll +DEFY;

On a 10+, they miss, hesitate, or you're saved by sheer luck—you rally, and clear a risk if you have one.

On a 7-9, retreat from the Sortie safely, or be put in peril.

On a fail, that strike sure was decisive. Decide with your Director the consequences of what has happened to you—what was damaged? What have you lost? Who and what is affected by your defeat?

If you survive, you are changed by your defeat. As well as the above, choose one;

- Deepen all of your Hooks, as you clutch your ideals tighter and tighter.
- Loosen all of your Hooks, as you lose faith in that which drives you.
- Take a burden, as you are saddled with some lingering injury, duty or obligation.
- Choose a new playbook. Keep what moves you and the Director agree are truly part of your character, and discard the others. Replace them with the starting moves for your new playbook. You do not gain its starting equipment.`;

const HELP_OR_HINDER = `When you ***help or hinder*** someone to influence their attempts to do something, roll;

- +1 if you spent meaningful time together before this Sortie
- +1 if they've helped or hindered you previously this Sortie
- +1 if they're part of one of your Hooks

On a 10+, they take advantage (help) or disadvantage (hinder) to their roll.

On a 7-9, as above, but you become entangled in the consequences of their actions, and possibly cause them.`;

const WEAVE_MAGIC = `When you ***weave magic*** to do something taxing with your power, roll +CHANNEL;

On a 10+, you manage to channel power the way you desired without ill effect.

On a 7-9, you succeed, but your invocation is twisted in an unexpected and dangerous way.`;

const LEAD_A_SORTIE = `When it's time for action and you ***lead a Sortie***, decide who planned the mission and roll;

- +KNOW, if you're leading with wits or following a clever plan.
- +CREW, if it was someone else aboard.
- +DEFY, if you're heading into danger blind.

On a 10+, you make it to the action unscathed.

On a 7-9, the crew stumbles, misses something important, or is unprepared for what they meet.`;

const SUBSYSTEMS = `When you ***activate your Astir's subsystems***, spend 1 Power to re-activate an expended [Active] Astir part and use it again.`;

const B_PLOT = `When you head out for some solitary revenge, leave to take part in negotiations, or otherwise take part in a secondary narrative thread to the players involved in the Sortie, you're in the ***b-plot***. Name one or two Director characters that accompany you and hold 3. During the Sortie, you may spend it 1-for-1 to do the following;

- Give another player confidence on their next move, but complicate things for yourself.
- Deny an actor from appearing during the Sortie—they're busy, possibly with the same thing as you.
- Spend some time and frame a Downtime Scene.
- Cut away from the Sortie during a moment when time is precious, giving everyone room to think.`;

const PLAN_AND_PREPARE = `When you review orders for the next Sortie, go over scouting reports and maps, or otherwise attempt to prepare the crew for what comes next, you're trying to ***plan & prepare***. Roll a d6, plus any extra dice earned during Downtime Scenes, and compare the results to the **Strength** of the Division that your next Sortie will target.

For every result that is equal to or above the Division's Strength, choose one (options can be picked multiple times, and their effects stack):

- During the Sortie, you will have an opportunity to;
  - Untap a Faction of the Cause—securing supplies, freeing captives, etc
  - Reduce a Division's Strength by 1 during the next Conflict Turn—interfering with supply routes, undermining their operations, etc
  - Reduce the GRIP on a Faction or Pillar by 1—rooting out agents, destroying fortifications, etc
  - Expose or make vulnerable an asset or actor
- During the Sortie, you will have a risky opportunity to;
  - Fell a Pillar with 0 GRIP—winning a decisive battle, capturing a position, etc
  - Destroy or capture an exposed asset or actor
  - Reduce a Division's Strength by 2 during the next Conflict Turn—disrupting a key shipment, assassinating important staff, etc
- The next lead a Sortie roll is made with advantage.
- All players hold 1. You may spend your hold during the next Sortie as if it were hold gained through one of your basic or playbook moves.
`;

const MoveText: { [key in MoveNameKey]: string } = {
  WEATHER_THE_STORM,
  READ_THE_ROOM,
  EXCHANGE_BLOWS,
  DISPEL_UNCERTAINTIES,
  STRIKE_DECISIVELY,
  COOL_OFF,
  HEAT_UP,
  BITE_THE_DUST,
  HELP_OR_HINDER,
  WEAVE_MAGIC,
  LEAD_A_SORTIE,
  SUBSYSTEMS,
  B_PLOT,
  PLAN_AND_PREPARE,
};

export function isMoveNameKey(
  maybeMoveName: string,
): maybeMoveName is MoveNameKey {
  return (MOVE_NAME_KEYS as string[]).includes(maybeMoveName);
}

export function getMoveText(moveName: MoveNameKey) {
  const moveText = MoveText[moveName];
  if (!moveText) throw new Error(`unknown move name ${moveName}`);
  return moveText;
}
