import React, { useMemo, useState } from "react";
import Image from "next/image";

import Sheet from "@/components/Sheet";
import TypeBox from "@/components/TypeBox";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import DeleteEncounterDialog from "./DeleteEncounterDialog";
import StatBox from "@/pages/Dashboard/CreateNuzlockeSheet/StatBox";
import ScrollArea from "@/components/ScrollArea";
import Dropdown from "@/components/Dropdown";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/Dropdown/Components";

import {
  Status,
  useGetEncounterQuery,
  useUpdateEncounterMutation,
} from "generated";

import { getOfficialArtwork } from "@/utils/getOfficialArtwork";
import { cn } from "@/utils/cn";
import { convertToThreeDigits } from "@/utils/convertToThreeDigits";
import { getPokemonEffectiveness } from "@/utils/getPokemonEffectiveness";

import { TYPE_BG_CLASS } from "src/const";

const MOVE_TO_OPTIONS = [
  { label: "Team", value: Status.InTeam },
  { label: "Fainted", value: Status.Fainted },
  { label: "PC", value: Status.InPc },
  { label: "Seen", value: Status.Seen },
];

interface EncounterSheetProps {
  open: boolean;
  onClose: () => void;
  encounterId?: string;
}

function EncounterSheet({ encounterId, open, onClose }: EncounterSheetProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data } = useGetEncounterQuery({
    variables: {
      encounterId: encounterId as string,
    },
    skip: !encounterId,
  });

  const [updateEncounter] = useUpdateEncounterMutation();

  const updateEncounterStatus = async (status: Status) => {
    await updateEncounter({
      variables: {
        encounterId: encounterId as string,
        input: {
          status,
        },
      },
    });
  };

  const artwork = useMemo(() => {
    return getOfficialArtwork(data?.getEncounter?.pokemon?.id ?? "");
  }, [data?.getEncounter?.pokemon?.id]);

  const effectiveness = useMemo(() => {
    return getPokemonEffectiveness(data?.getEncounter?.pokemon?.types ?? []);
  }, [data?.getEncounter?.pokemon?.types]);

  const filteredMoveToOptions = useMemo(() => {
    return MOVE_TO_OPTIONS.filter((option) => {
      return option.value !== data?.getEncounter?.status;
    });
  }, [data?.getEncounter?.status]);

  if (!data?.getEncounter || !encounterId) {
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
      size="default"
      className="w-full p-0 md:w-1/3"
    >
      <ScrollArea className="h-screen pb-16">
        <div
          className={cn(
            TYPE_BG_CLASS[data?.getEncounter?.pokemon?.types?.[0]],
            "relative mb-6 flex h-[200px] flex-col items-center rounded-b-[50%]"
          )}
        >
          <Image
            src={artwork}
            alt={data?.getEncounter?.pokemon?.id}
            className="absolute -bottom-[35%] h-60 w-60 lg:-bottom-[45%] lg:h-[300px] lg:w-[300px]"
            width={300}
            height={300}
          />
        </div>
        <div className="p-6">
          <div className="mb-4 mt-10 flex flex-col">
            <div className="flex justify-between">
              <Typography variant="p" className="capitalize">
                {data?.getEncounter?.pokemon?.name}
              </Typography>
              <Typography variant="p" className="capitalize">
                #{convertToThreeDigits(data?.getEncounter?.pokemon?.id)}
              </Typography>
            </div>
            <Typography variant="h1">{data?.getEncounter?.nickname}</Typography>
          </div>

          <div className="my-4 flex flex-col gap-2">
            <Typography variant="h3">Types</Typography>
            <div className="grid grid-cols-2 gap-4">
              {data?.getEncounter?.pokemon?.types?.map((type) => (
                <TypeBox key={type} type={type} />
              ))}
            </div>
          </div>
          <div className="my-4 flex flex-col gap-2">
            <Typography variant="h3">Details</Typography>
            <div className="grid grid-cols-2 gap-4">
              <StatBox
                statName="Location"
                statValue={data?.getEncounter.location}
              />
              <StatBox
                statName="Status"
                statValue={data?.getEncounter.status.replace("_", " ")}
              />
            </div>
          </div>
          <div className="my-4 flex flex-col gap-2">
            <Typography variant="h3">Resistant</Typography>
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
          <div
            className={cn("flex flex-col gap-2", {
              "mb-12": !effectiveness?.immune.length,
            })}
          >
            <Typography variant="h3">Weak</Typography>
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
            <div className="mb-12 flex flex-col gap-2">
              <Typography variant="h4" className="mt-4">
                Immune
              </Typography>
              <div className="flex flex-wrap gap-4">
                {effectiveness.immune.map((type) => {
                  return <TypeBox key={type} type={type} multiplier="0" />;
                })}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="fixed bottom-4 right-6 flex justify-end gap-4">
        <Button variant="secondary" size="sm">
          Edit
        </Button>
        <Dropdown
          content={
            <DropdownMenuGroup>
              {filteredMoveToOptions.map((option) => (
                <DropdownMenuItem
                  className="cursor-pointer"
                  key={option.value}
                  onClick={() => updateEncounterStatus(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          }
        >
          <Button variant="outline" size="sm">
            Move
          </Button>
        </Dropdown>
        <Button
          variant="destructive"
          onClick={() => setDeleteDialogOpen(true)}
          size="sm"
        >
          Delete
        </Button>
      </div>
      <DeleteEncounterDialog
        encounterId={encounterId}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </Sheet>
  );
}

export default EncounterSheet;
