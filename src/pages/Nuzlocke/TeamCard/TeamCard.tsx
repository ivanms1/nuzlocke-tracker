import Typography from "@/components/Typography";
import Image from "next/image";
import Pokeball from "@/assets/svg/pokeball.svg";

function convertToThreeDigits(num: number | string) {
  return num.toString().padStart(3, "0");
}

interface TeamCardProps {
  encounter: {
    nickname: string;
    pokemon: {
      id: string;
      types: string[];
    };
  };
}

function TeamCard({ encounter }: TeamCardProps) {
  const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${encounter.pokemon.id}.png`;
  return (
    <div
      className={`${
        BG_CLASS[encounter.pokemon.types[0]]
      } relative w-72 rounded-lg px-10 py-6`}
    >
      <div className="flex justify-between text-xl text-white">
        <Typography variant="p">{encounter.nickname}</Typography>
        <Typography variant="p">
          #{convertToThreeDigits(encounter.pokemon.id)}
        </Typography>
      </div>
      <Pokeball className="absolute left-1/2 -translate-x-1/2 transform" />
      <Image
        className="relative w-full"
        alt={encounter.nickname}
        src={imageSource}
        width={200}
        height={200}
      />
    </div>
  );
}

const BG_CLASS: Record<string, string> = {
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
};

export default TeamCard;
