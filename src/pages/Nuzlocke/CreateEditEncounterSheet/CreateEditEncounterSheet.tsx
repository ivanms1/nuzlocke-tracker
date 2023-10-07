import { z } from "zod";
import gql from "graphql-tag";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import FormCombobox from "@/components/Combobox/FormCombobox";
import Input from "@/components/Input";
import FormSelect from "@/components/Select/FormSelect";
import Sheet from "@/components/Sheet";

import { getOfficialArtwork } from "@/utils/getOfficialArtwork";

import { Status, useCreateEncounterMutation } from "generated";

import { POKEMON_OPTIONS } from "src/const/pokemon";

const NEW_ENCOUNTER_FRAGMENT = gql`
  fragment NewEncounter on Encounter {
    id
    location
    nickname
    pokemon {
      id
      name
      sprite
      types
    }
    status
    createdAt
  }
`;

const encounterSchema = z.object({
  nickname: z.string(),
  pokemonId: z.number(),
  location: z.string(),
  status: z.nativeEnum(Status),
});

type Encounter = z.infer<typeof encounterSchema>;

interface CreateEditEncounterSheetProps {
  open: boolean;
  onClose: () => void;
  encounter?: Encounter;
}

function CreateEditEncounterSheet({
  open,
  onClose,
  encounter,
}: CreateEditEncounterSheetProps) {
  const { register, control, watch, handleSubmit, reset } = useForm<Encounter>({
    defaultValues: encounter,
  });
  const [createEncounter] = useCreateEncounterMutation();
  const { query } = useRouter();

  useEffect(() => {
    if (!open) {
      reset({
        nickname: "",
        pokemonId: 0,
        location: "",
        status: Status.Seen,
      });
    }
  }, [open, reset]);

  const pokemonId = watch("pokemonId");

  const onSubmit: SubmitHandler<Encounter> = async (data) => {
    try {
      await createEncounter({
        variables: {
          nuzlockeId: query?.id as string,
          input: {
            nickname: data.nickname,
            pokemonId: data.pokemonId,
            location: data.location,
            status: data.status,
          },
        },
        update(cache, { data }) {
          cache.modify({
            id: cache.identify({
              __typename: "Nuzlocke",
              id: query.id,
            }),
            fields: {
              encounters(existingEncounters = []) {
                const newEncounterRef = cache.writeFragment({
                  data: data?.createEncounter,
                  fragment: NEW_ENCOUNTER_FRAGMENT,
                });
                return [...existingEncounters, newEncounterRef];
              },
            },
          });
        },
      });
      onClose();
    } catch (e) {
      // TOO: handle error
    }
  };

  const artwork = useMemo(() => {
    return getOfficialArtwork(pokemonId);
  }, [pokemonId]);

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onClose();
        }
      }}
      title="Add Encounter"
      description="Add a new encounter to your nuzlocke"
      position="right"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 py-10"
      >
        <Input label="Nickname" {...register("nickname")} />
        <Input label="Location" {...register("location")} />
        <FormSelect
          label="Status"
          name="status"
          options={STATUS_OPTIONS}
          control={control}
        />
        <FormCombobox
          label="Pokemon"
          name="pokemonId"
          control={control}
          options={POKEMON_OPTIONS}
          placeholder="Select a pokemon"
        />
        {!!pokemonId && artwork ? (
          <Image
            src={artwork}
            className="self-center"
            alt={pokemonId.toString()}
            width={350}
            height={350}
          />
        ) : (
          <div className="h-[350px] w-[350px]" />
        )}
        <Button className="mt-4 self-end" type="submit">
          Add Encounter
        </Button>
      </form>
    </Sheet>
  );
}

export default CreateEditEncounterSheet;

const STATUS_OPTIONS = [
  { label: "Seen", value: Status.Seen },
  { label: "In Team", value: Status.InTeam },
  { label: "In PC", value: Status.InPc },
  { label: "Fainted", value: Status.Fainted },
];
