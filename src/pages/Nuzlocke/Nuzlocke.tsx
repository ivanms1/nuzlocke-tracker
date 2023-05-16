import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { useGetNuzlockeQuery } from "generated";
import { useRouter } from "next/router";
import React from "react";
import CreateEditEncounterSheet from "./CreateEditEncounterSheet";
import Image from "next/image";

interface NuzlockeProps {}

function Nuzlocke({}: NuzlockeProps) {
  const [isCreateEncounterOpen, setIsCreateEncounterOpen] =
    React.useState(false);

  const { query } = useRouter();
  const { data } = useGetNuzlockeQuery({
    variables: {
      id: query.id as string,
    },
    skip: !query.id,
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Typography variant="h1">{data?.getNuzlocke?.title}</Typography>
        <Typography variant="p">{data?.getNuzlocke?.description}</Typography>
      </div>
      <div className="flex gap-5">
        {data?.getNuzlocke?.encounters.map((encounter) => {
          return (
            <div key={encounter.id}>
              <Typography variant="h4">{encounter.nickname}</Typography>
              <Image
                alt={encounter.nickname}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${encounter.pokemonId}.png`}
                width={100}
                height={100}
              />
            </div>
          );
        })}
      </div>
      <Button
        size="lg"
        className="self-end"
        onClick={() => setIsCreateEncounterOpen(true)}
      >
        Add Encounter
      </Button>
      <CreateEditEncounterSheet
        open={isCreateEncounterOpen}
        onClose={() => setIsCreateEncounterOpen(false)}
      />
    </div>
  );
}

export default Nuzlocke;
