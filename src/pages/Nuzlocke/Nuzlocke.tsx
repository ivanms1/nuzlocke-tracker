import React from "react";
import { useRouter } from "next/router";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import CreateEditEncounterSheet from "./CreateEditEncounterSheet";
import TeamCard from "./TeamCard";

import { useGetNuzlockeQuery } from "generated";

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
      <div className="flex flex-col gap-4">
        <Typography variant="h1">{data?.getNuzlocke?.title}</Typography>
        <Typography variant="h4">{data?.getNuzlocke?.game?.name}</Typography>
        <div className="flex gap-2">
          {data?.getNuzlocke?.game?.regions.map((region) => {
            return (
              <Typography key={region} variant="p">
                {region.toLocaleUpperCase()}
              </Typography>
            );
          })}
        </div>

        <Typography variant="p">{data?.getNuzlocke?.description}</Typography>
      </div>
      <div className="flex flex-wrap gap-5">
        {data?.getNuzlocke?.encounters.map((encounter) => {
          return <TeamCard key={encounter.id} encounter={encounter} />;
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
