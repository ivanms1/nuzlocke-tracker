import { TYPES_MATCHUP } from "src/const";

export function getPokemonEffectiveness(types: string[]) {
  const matchups = types?.reduce<{
    weak: string[];
    resistant: string[];
    immune: string[];
  }>(
    (acc, type) => {
      return {
        ...acc,
        weak: [...acc?.weak, ...TYPES_MATCHUP[type]?.weak],
        resistant: [...acc?.resistant, ...TYPES_MATCHUP[type]?.resistant],
        immune: [...acc?.immune, ...TYPES_MATCHUP[type]?.immune],
      };
    },
    {
      weak: [],
      resistant: [],
      immune: [],
    }
  );

  // remove from weak the types that are in resistant
  const newWeak = matchups.weak.filter(
    (type) =>
      !matchups.resistant.includes(type) && !matchups.immune.includes(type)
  );

  // remove from resistant the types that are in weak
  const newResistant = (matchups.resistant = matchups.resistant.filter(
    (type) => !matchups.weak.includes(type) && !matchups.immune.includes(type)
  ));

  return {
    weak: newWeak,
    resistant: newResistant,
    immune: matchups.immune,
  };
}
