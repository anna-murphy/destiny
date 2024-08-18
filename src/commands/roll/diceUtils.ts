export const KEEP_OPTS = ["highest", "lowest"] as const;
export type KeepOpts = (typeof KEEP_OPTS)[number];

export const REDUCE_OPTS = ["sum", "highest", "lowest"] as const;
export type ReduceOpts = (typeof REDUCE_OPTS)[number];

export const REDUCE_COMPARATORS = ["above", "below", "equal"] as const;
export type ReduceComparators = (typeof REDUCE_COMPARATORS)[number];

export type RollOpts = {
  cast?: { rolled: number; into: number }[];
  select?:
    | {
        mode: "keep";
        direction: KeepOpts;
        keep: "all" | number;
      }
    | { mode: "drop"; direction: KeepOpts; drop: "none" | number };
  reduce?:
    | {
        mode: "select";
        with: ReduceOpts;
      }
    | {
        mode: "count";
        with: ReduceComparators;
        floor: number;
      };
  modifier?: number;
};

export function applyCast(result: number, castOpts: RollOpts["cast"] = []) {
  const filteredCast = castOpts.filter(({ rolled }) => rolled === result);
  if (filteredCast.length >= 1) return filteredCast[0].into;
  else return result;
}

function applySelect(results: number[], selectOpts: RollOpts["select"]) {
  if (!selectOpts) return results;
  let resultsAfterSelect = [...results];

  const { direction } = selectOpts;
  resultsAfterSelect = resultsAfterSelect.sort((a, b) =>
    direction === "highest" ? b - a : a - b,
  );
  if (selectOpts.mode === "keep" && selectOpts.keep !== "all") {
    resultsAfterSelect = resultsAfterSelect.slice(0, selectOpts.keep);
  } else if (selectOpts.mode === "drop" && selectOpts.drop !== "none") {
    resultsAfterSelect = resultsAfterSelect.slice(0, selectOpts.drop);
  }

  return resultsAfterSelect;
}

function applyReduce(
  results: number[],
  reduceOpts: RollOpts["reduce"] = { mode: "select", with: "highest" },
) {
  if (reduceOpts.mode === "select") {
    if (reduceOpts.with === "sum")
      return results.reduce((prev, next) => prev + next, 0);
    else if (reduceOpts.with === "highest") return Math.max(...results);
    else return Math.min(...results);
  } else {
    const { floor } = reduceOpts;
    if (reduceOpts.with === "above")
      return results.filter((result) => result > floor).length;
    else if (reduceOpts.with === "below")
      return results.filter((result) => result < floor).length;
    else if (reduceOpts.with === "equal")
      return results.filter((result) => result === floor).length;
  }
  return 0;
}

function applyModifier(result: number, modifierOpts: RollOpts["modifier"] = 0) {
  return result + modifierOpts;
}

export function interpretDiceRollViaOpts(results: number[], opts: RollOpts) {
  const adjustedResults = results.map((result) => applyCast(result, opts.cast));
  const resultsAfterSelect = applySelect(adjustedResults, opts.select);
  const resultAfterReduce = applyReduce(resultsAfterSelect, opts.reduce);
  const resultAfterModifier = applyModifier(resultAfterReduce, opts.modifier);
  return resultAfterModifier;
}

export function roll(size: number) {
  return Math.floor(size * Math.random()) + 1;
}

export function rollN(size: number, number: number, opts?: RollOpts) {
  return Array.from(Array(number), () => roll(size));
}

export function rollNAndReduce(size: number, number: number, opts: RollOpts) {
  const dice = rollN(size, number);
  return { dice, result: interpretDiceRollViaOpts(dice, opts) };
}
