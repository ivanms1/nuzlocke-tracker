import React, { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/Typography";
import Button from "@/components/Button/Button";
import CreateNuzlockeSheet from "./CreateNuzlockeSheet";
import Layout from "@/components/Layout";

import { useSearchNuzlockesQuery } from "generated";
import { useSelectedNuzlocke } from "src/state/selectedNuzlocke";

import { cn } from "@/utils/cn";

function Dashboard() {
  const [isNewNuzlockeOpen, setIsNewNuzlockeOpen] = React.useState(false);
  const { data } = useSearchNuzlockesQuery();
  const { setSelectedNuzlocke } = useSelectedNuzlocke();

  return (
    <div>
      <div className="flex justify-between">
        <Typography className="mb-10" variant="h1">
          Nuzlockes
        </Typography>
        <Button size="lg" onClick={() => setIsNewNuzlockeOpen(true)}>
          Create Nuzlocke
        </Button>
      </div>
      <div className="flex flex-wrap justify-evenly gap-8">
        {data?.searchNuzlockes?.results?.map((nuzlocke) => (
          <Link
            href={`/nuzlocke/${nuzlocke.id}`}
            className={cn(
              "flex h-24 w-[320px] rounded-xl text-white",
              REGION_BG[
                nuzlocke?.game?.regions[nuzlocke?.game?.regions?.length - 1] ??
                  "kanto"
              ]
            )}
            onClick={() => {
              setSelectedNuzlocke({
                id: nuzlocke.id,
                title: nuzlocke.title,
              });
            }}
            key={nuzlocke.id}
          >
            <div className="flex h-full w-full items-center justify-between rounded-xl px-6 py-2 backdrop-brightness-50 transition-all hover:backdrop-brightness-75">
              <Typography className="text-lg font-semibold" variant="p">
                {nuzlocke.title}
              </Typography>
              <div className="grid grid-cols-3">
                {nuzlocke?.encounters?.map((encounter) => (
                  <Image
                    key={encounter.id}
                    alt={encounter.nickname}
                    width={45}
                    height={45}
                    src={encounter.pokemon.sprite}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <CreateNuzlockeSheet
        open={isNewNuzlockeOpen}
        onClose={() => setIsNewNuzlockeOpen(false)}
      />
    </div>
  );
}

const REGION_BG: Record<string, string> = {
  kanto: "bg-kanto",
  johto: "bg-johto",
  hoenn: "bg-hoenn",
  sinnoh: "bg-sinnoh",
  unova: "bg-unova",
  kalos: "bg-kalos",
  alola: "bg-alola",
  galar: "bg-galar",
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
