import React, { type ReactElement } from "react";

import Button from "@/components/Button";
import Typography from "@/components/Typography";
import CreateEditEncounterSheet from "./CreateEditEncounterSheet";
import TeamCard from "@/components/TeamCard";
import Layout from "@/components/Layout";

import useGetCurrentNuzlocke from "@/hooks/useGetCurrentNuzlocke";

import {
  Status,
  useGetNuzlockeEncountersQuery,
  useGetNuzlockeQuery,
} from "generated";

function Nuzlocke() {
  const [isCreateEncounterOpen, setIsCreateEncounterOpen] =
    React.useState(false);

  const { currentNuzlocke } = useGetCurrentNuzlocke();

  const { data: nuzlockeData } = useGetNuzlockeQuery({
    variables: {
      id: currentNuzlocke?.id ?? "",
    },
    skip: !currentNuzlocke?.id,
  });

  const { data } = useGetNuzlockeEncountersQuery({
    variables: {
      nuzlockeId: currentNuzlocke?.id as string,
      input: {
        filter: {
          status: Status.InTeam,
        },
      },
    },
    skip: !currentNuzlocke?.id,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            <Typography variant="h1">{currentNuzlocke?.title}</Typography>
            <Typography variant="h4">
              {nuzlockeData?.getNuzlocke?.game?.name}
            </Typography>
          </div>
          <Button size="lg" onClick={() => setIsCreateEncounterOpen(true)}>
            Add Encounter
          </Button>
        </div>

        <div className="flex gap-2">
          {nuzlockeData?.getNuzlocke?.game?.regions.map((region) => {
            return (
              <Typography key={region.id} variant="p">
                {region.name.toLocaleUpperCase()}
              </Typography>
            );
          })}
        </div>

        <Typography variant="p">{currentNuzlocke?.description}</Typography>
      </div>
      <div className="flex flex-wrap gap-5">
        {data?.getNuzlockeEncounters.results
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

Nuzlocke.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Nuzlocke;
