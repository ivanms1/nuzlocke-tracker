import React, { useMemo } from "react";
import Image from "next/image";

import Sheet from "@/components/Sheet";
import TypeBox from "@/components/TypeBox";
import Typography from "@/components/Typography";

import { useGetEncounterQuery } from "generated";

import { getOfficialArtwork } from "@/utils/getOfficialArtwork";
import { cn } from "@/utils/cn";
import { convertToThreeDigits } from "@/utils/convertToThreeDigits";

import { TYPE_BG_CLASS } from "src/const";
import StatBox from "@/pages/Dashboard/CreateNuzlockeSheet/StatBox";
import { getPokemonEffectiveness } from "@/utils/getPokemonEffectiveness";

interface EncounterSheetProps {
  open: boolean;
  onClose: () => void;
  encounterId?: string;
}

function EncounterSheet({ encounterId, open, onClose }: EncounterSheetProps) {
  const { data } = useGetEncounterQuery({
    variables: {
      encounterId: encounterId as string,
    },
    skip: !encounterId,
  });

  const artwork = useMemo(() => {
    return getOfficialArtwork(data?.getEncounter?.pokemon?.id ?? "");
  }, [data?.getEncounter?.pokemon?.id]);

  const effectiveness = useMemo(() => {
    return getPokemonEffectiveness(data?.getEncounter?.pokemon?.types ?? []);
  }, [data?.getEncounter?.pokemon?.types]);

  if (!data?.getEncounter) {
    return null;
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onClose();
        }
      }}
      position="right"
    >
      <div
        className={cn(
          TYPE_BG_CLASS[data?.getEncounter?.pokemon?.types?.[0]],
          "relative -m-6 mb-6 flex h-[200px] flex-col items-center rounded-b-[50%] py-8"
        )}
      >
        <Image
          src={artwork}
          alt={data?.getEncounter?.pokemon?.id}
          className="absolute -bottom-[45%]"
          width={300}
          height={300}
        />
      </div>
      <div className="mb-4 mt-10 flex flex-col">
        <Typography variant="h2">{data?.getEncounter?.nickname}</Typography>
        <Typography variant="p" className="capitalize">
          {data?.getEncounter?.pokemon?.name}
        </Typography>
        <Typography variant="p" className="capitalize">
          #{convertToThreeDigits(data?.getEncounter?.pokemon?.id)}
        </Typography>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        {data?.getEncounter?.pokemon?.types?.map((type) => (
          <TypeBox key={type} type={type} />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <StatBox statName="Location" statValue={data?.getEncounter.location} />
        <StatBox
          statName="Status"
          statValue={data?.getEncounter.status.replace("_", " ")}
        />
      </div>
      <div className="mb-4">
        <Typography variant="h4" className="mt-4">
          Resistant
        </Typography>
        <div className="grid grid-cols-2 gap-4">
          {effectiveness.resistant.map((type, index) => {
            if (effectiveness.resistant.indexOf(type) !== index) {
              return null;
            }

            const isRepeatedInArray =
              effectiveness.resistant.lastIndexOf(type) !== index;

            return (
              <TypeBox
                key={type}
                type={type}
                multiplier={isRepeatedInArray ? "¼" : "½"}
              />
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <Typography variant="h4" className="mt-4">
          Weak
        </Typography>
        <div className="grid grid-cols-2 gap-4">
          {effectiveness.weak.map((type, index) => {
            if (effectiveness.weak.indexOf(type) !== index) {
              return null;
            }

            const isRepeatedInArray =
              effectiveness.weak.lastIndexOf(type) !== index;
            return (
              <TypeBox
                key={type}
                type={type}
                multiplier={isRepeatedInArray ? "4" : "2"}
              />
            );
          })}
        </div>
      </div>

      {effectiveness?.immune.length > 0 && (
        <div className="mb-4">
          <Typography variant="h4" className="mt-4">
            Immune
          </Typography>
          <div className="mb-4 flex flex-wrap gap-4">
            {effectiveness.immune.map((type) => {
              return <TypeBox key={type} type={type} multiplier="0" />;
            })}
          </div>
        </div>
      )}
    </Sheet>
  );
}

export default EncounterSheet;
