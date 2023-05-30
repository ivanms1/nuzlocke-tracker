import React from "react";
import { useRouter } from "next/router";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import CreateEditEncounterSheet from "./CreateEditEncounterSheet";
import TeamCard from "./TeamCard";

import { Status, useGetNuzlockeQuery } from "generated";
import { useSelectedNuzlocke } from "src/state/selectedNuzlocke";

interface NuzlockeProps {}

function Nuzlocke({}: NuzlockeProps) {
  const [isCreateEncounterOpen, setIsCreateEncounterOpen] =
    React.useState(false);

  const { query } = useRouter();

  const { selectedNuzlocke, setSelectedNuzlocke } = useSelectedNuzlocke();
  const { data } = useGetNuzlockeQuery({
    variables: {
      id: query.id as string,
    },
    skip: !query.id,
    onCompleted: (data) => {
      if (data?.getNuzlocke && !selectedNuzlocke) {
        setSelectedNuzlocke({
          id: data.getNuzlocke.id,
          title: data.getNuzlocke.title,
        });
      }
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            <Typography variant="h1">{data?.getNuzlocke?.title}</Typography>
            <Typography variant="h4">
              {data?.getNuzlocke?.game?.name}
            </Typography>
          </div>
          <Button size="lg" onClick={() => setIsCreateEncounterOpen(true)}>
            Add Encounter
          </Button>
        </div>

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
        {data?.getNuzlocke?.encounters
          .filter((e) => e.status === Status.InTeam)
          .map((encounter) => {
            return <TeamCard key={encounter.id} encounter={encounter} />;
          })}
      </div>

      <CreateEditEncounterSheet
        open={isCreateEncounterOpen}
        onClose={() => setIsCreateEncounterOpen(false)}
      />
    </div>
  );
}

export default Nuzlocke;
