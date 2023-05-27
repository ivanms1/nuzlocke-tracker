import { NuzlockeType } from "@prisma/client";

import FireIcon from "@/assets/svg/fire.svg";
import WaterIcon from "@/assets/svg/water.svg";
import ElectricIcon from "@/assets/svg/electric.svg";
import GrassIcon from "@/assets/svg/grass.svg";
import IceIcon from "@/assets/svg/ice.svg";
import FightingIcon from "@/assets/svg/fighting.svg";
import PoisonIcon from "@/assets/svg/poison.svg";
import GroundIcon from "@/assets/svg/ground.svg";
import FlyingIcon from "@/assets/svg/flying.svg";
import PsychicIcon from "@/assets/svg/psychic.svg";
import BugIcon from "@/assets/svg/bug.svg";
import RockIcon from "@/assets/svg/rock.svg";
import GhostIcon from "@/assets/svg/ghost.svg";
import DragonIcon from "@/assets/svg/dragon.svg";
import DarkIcon from "@/assets/svg/dark.svg";
import SteelIcon from "@/assets/svg/steel.svg";
import FairyIcon from "@/assets/svg/fairy.svg";
import NormalIcon from "@/assets/svg/normal.svg";

export const GAME_TYPES = [
  {
    value: NuzlockeType.NORMAL,
    label: "Normal",
  },
  {
    value: NuzlockeType.SOUL_LINK,
    label: "Soul Link",
  },
  {
    value: NuzlockeType.CAGELOCKE,
    label: "Cagelocke",
  },
  {
    value: NuzlockeType.CUSTOM,
    label: "Custom",
  },
];

export const POKEMON_GAMES = [
  {
    value: 1,
    label: "Red",
  },
  {
    value: 2,
    label: "Blue",
  },
  {
    value: 3,
    label: "Yellow",
  },
  {
    value: 4,
    label: "Gold",
  },
  {
    value: 5,
    label: "Silver",
  },
  {
    value: 6,
    label: "Crystal",
  },
  {
    value: 7,
    label: "Ruby",
  },
  {
    value: 8,
    label: "Sapphire",
  },
  {
    value: 9,
    label: "Emerald",
  },
  {
    value: 10,
    label: "Firered",
  },
  {
    value: 11,
    label: "Leafgreen",
  },
  {
    value: 12,
    label: "Diamond",
  },
  {
    value: 13,
    label: "Pearl",
  },
  {
    value: 14,
    label: "Platinum",
  },
  {
    value: 15,
    label: "Heartgold",
  },
  {
    value: 16,
    label: "Soulsilver",
  },
  {
    value: 17,
    label: "Black",
  },
  {
    value: 18,
    label: "White",
  },
  {
    value: 19,
    label: "Colosseum",
  },
  {
    value: 20,
    label: "XD",
  },
  {
    value: 21,
    label: "Black 2",
  },
  {
    value: 22,
    label: "White 2",
  },
  {
    value: 23,
    label: "X",
  },
  {
    value: 24,
    label: "Y",
  },
  {
    value: 25,
    label: "Omega Ruby",
  },
  {
    value: 26,
    label: "Alpha Sapphire",
  },
  {
    value: 27,
    label: "Sun",
  },
  {
    value: 28,
    label: "Moon",
  },
  {
    value: 29,
    label: "Ultra Sun",
  },
  {
    value: 30,
    label: "Ultra Moon",
  },
  {
    value: 31,
    label: "Let's Go Pikachu",
  },
  {
    value: 32,
    label: "Let's Go Eevee",
  },
  {
    value: 33,
    label: "Sword",
  },
  {
    value: 34,
    label: "Shield",
  },
  {
    value: 35,
    label: "The Isle Of Armor",
  },
  {
    value: 36,
    label: "The Crown Tundra",
  },
  {
    value: 37,
    label: "Brilliant Diamond",
  },
  {
    value: 38,
    label: "Shining Pearl",
  },
  {
    value: 39,
    label: "Legends Arceus",
  },
  {
    value: 40,
    label: "Scarlet",
  },
  {
    value: 41,
    label: "Violet",
  },
];

export const TYPE_BG_CLASS: Record<string, string> = {
  normal: "bg-normal",
  fire: "bg-fire",
  water: "bg-water",
  electric: "bg-electric",
  grass: "bg-grass",
  ice: "bg-ice",
  fighting: "bg-fighting",
  poison: "bg-poison",
  ground: "bg-ground",
  flying: "bg-flying",
  psychic: "bg-psychic",
  bug: "bg-bug",
  rock: "bg-rock",
  ghost: "bg-ghost",
  dragon: "bg-dragon",
  dark: "bg-dark",
  steel: "bg-steel",
  fairy: "bg-fairy",
};

export const TYPE_ICON: Record<string, any> = {
  normal: NormalIcon,
  fire: FireIcon,
  water: WaterIcon,
  electric: ElectricIcon,
  grass: GrassIcon,
  ice: IceIcon,
  fighting: FightingIcon,
  poison: PoisonIcon,
  ground: GroundIcon,
  flying: FlyingIcon,
  psychic: PsychicIcon,
  bug: BugIcon,
  rock: RockIcon,
  ghost: GhostIcon,
  dragon: DragonIcon,
  dark: DarkIcon,
  steel: SteelIcon,
  fairy: FairyIcon,
};

export const TYPES_MATCHUP: Record<
  string,
  {
    resistant: string[];
    weak: string[];
    immune: string[];
  }
> = {
  normal: {
    resistant: ["ghost"],
    weak: ["fighting"],
    immune: [],
  },
  fire: {
    resistant: ["fire", "grass", "ice", "bug", "steel", "fairy"],
    weak: ["water", "ground", "rock"],
    immune: [],
  },
  water: {
    resistant: ["fire", "water", "ice", "steel"],
    weak: ["electric", "grass"],
    immune: [],
  },
  electric: {
    resistant: ["electric", "flying", "steel"],
    weak: ["ground"],
    immune: [],
  },
  grass: {
    resistant: ["water", "electric", "grass", "ground"],
    weak: ["fire", "ice", "poison", "flying", "bug"],
    immune: [],
  },
  ice: {
    resistant: ["ice"],
    weak: ["fire", "fighting", "rock", "steel"],
    immune: [],
  },
  fighting: {
    resistant: ["bug", "rock", "dark"],
    weak: ["flying", "psychic", "fairy"],
    immune: ["ghost"],
  },
  poison: {
    resistant: ["grass", "fighting", "poison", "bug", "fairy"],
    weak: ["ground", "psychic"],
    immune: [],
  },
  ground: {
    resistant: ["poison", "rock"],
    weak: ["water", "grass", "ice"],
    immune: ["electric"],
  },
  flying: {
    resistant: ["grass", "fighting", "bug"],
    weak: ["electric", "ice", "rock"],
    immune: ["ground"],
  },
  psychic: {
    resistant: ["fighting", "psychic"],
    weak: ["bug", "ghost", "dark"],
    immune: ["dark"],
  },
  bug: {
    resistant: ["grass", "fighting", "ground"],
    weak: ["fire", "flying", "rock"],
    immune: [],
  },
  rock: {
    resistant: ["normal", "fire", "poison", "flying"],
    weak: ["water", "grass", "fighting", "ground", "steel"],
    immune: [],
  },
  ghost: {
    resistant: ["poison", "bug"],
    weak: ["ghost", "dark"],
    immune: ["normal", "fighting"],
  },
  dragon: {
    resistant: ["fire", "water", "electric", "grass"],
    weak: ["ice", "dragon", "fairy"],
    immune: ["fairy"],
  },
  dark: {
    resistant: ["ghost", "dark"],
    weak: ["fighting", "bug", "fairy"],
    immune: ["psychic"],
  },
  steel: {
    resistant: [
      "normal",
      "grass",
      "ice",
      "flying",
      "psychic",
      "bug",
      "rock",
      "dragon",
      "steel",
      "fairy",
    ],
    weak: ["fire", "fighting", "ground"],
    immune: ["poison"],
  },
  fairy: {
    resistant: ["fighting", "bug", "dark"],
    weak: ["poison", "steel"],
    immune: ["dragon"],
  },
};
