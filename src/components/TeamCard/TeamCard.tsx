import { useState } from "react";

import Typography from "@/components/Typography";
import Image from "next/image";

import Pokeball from "@/assets/svg/pokeball.svg";
import EncounterSheet from "../EncounterSheet";

import { TYPE_BG_CLASS } from "src/const";
import { cn } from "@/utils/cn";
import { convertToThreeDigits } from "@/utils/convertToThreeDigits";

interface TeamCardProps {
  small?: boolean;
  encounter: {
    id: string;
    nickname: string;
    pokemon: {
      id: string;
      types: {
        id: string;
        name: string;
      }[];
    };
  };
}

function TeamCard({ encounter, small }: TeamCardProps) {
  const [isEncounterSheetOpen, setIsEncounterSheetOpen] = useState(false);
  const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${encounter.pokemon.id}.png`;

  return (
    <>
      <button
        className={cn(
          TYPE_BG_CLASS[encounter.pokemon.types?.[0]?.name],
          "relative w-72 rounded-lg px-10 py-6 transition-all hover:bg-opacity-80",
          { "h-36 w-36 px-4 py-0": small }
        )}
        onClick={() => setIsEncounterSheetOpen(true)}
      >
        <div
          className={cn("flex justify-between text-xl text-white", {
            "text-sm": small,
          })}
        >
          <Typography variant="p">{encounter.nickname}</Typography>
          <Typography variant="p">
            #{convertToThreeDigits(encounter.pokemon.id)}
          </Typography>
        </div>
        <Pokeball className="absolute left-1/2 top-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 transform" />
        <Image
          className="relative w-full"
          alt={encounter.nickname}
          src={imageSource}
          width={small ? 100 : 200}
          height={small ? 100 : 200}
        />
      </button>
      <EncounterSheet
        open={isEncounterSheetOpen}
        onClose={() => setIsEncounterSheetOpen(false)}
        encounterId={encounter.id}
      />
    </>
  );
}

export default TeamCard;
