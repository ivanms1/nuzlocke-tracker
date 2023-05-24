import React from "react";
import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/Typography";

import { useSearchNuzlockesQuery } from "generated";
import { useSelectedNuzlocke } from "src/state/selectedNuzlocke";

import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/Button/Button";

function Dashboard() {
  const { data } = useSearchNuzlockesQuery();
  const { setSelectedNuzlocke } = useSelectedNuzlocke();

  return (
    <div>
      <Typography variant="h2">Nuzlockes</Typography>
      <div className="flex gap-3">
        {data?.searchNuzlockes?.results?.map((nuzlocke) => (
          <Link
            href={`/nuzlocke/${nuzlocke.id}`}
            className={cn(
              "flex h-24 min-w-[320px] rounded-xl text-white",
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
              <div className="flex flex-wrap gap-2">
                {nuzlocke?.encounters?.map((encounter) => (
                  <Image
                    key={encounter.id}
                    alt={encounter.nickname}
                    width={50}
                    height={50}
                    src={encounter.pokemon.sprite}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
        <Link href="/create-nuzlocke" className={buttonVariants()}>
          Create Nuzlocke
        </Link>
      </div>
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

export default Dashboard;
