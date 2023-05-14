import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { useGetNuzlockeQuery } from "generated";
import { useRouter } from "next/router";
import React from "react";
import CreateEditEncounterSheet from "./CreateEditEncounterSheet";

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
    <div>
      <div>
        <Typography variant="h1">{data?.getNuzlocke?.title}</Typography>
        <Typography variant="p">{data?.getNuzlocke?.description}</Typography>
      </div>
      <Button onClick={() => setIsCreateEncounterOpen(true)}>
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
