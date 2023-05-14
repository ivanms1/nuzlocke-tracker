import Button from "@/components/Button";
import FormCombobox from "@/components/Combobox/FormCombobox";
import Input from "@/components/Input";
import FormSelect from "@/components/Select/FormSelect";
import Sheet from "@/components/Sheet";

import { Status, useCreateEncounterMutation } from "generated";
import Image from "next/image";
import { useRouter } from "next/router";

import { type SubmitHandler, useForm } from "react-hook-form";
import { POKEMON_OPTIONS } from "src/const/pokemon";
import { z } from "zod";

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
}

function CreateEditEncounterSheet({
  open,
  onClose,
}: CreateEditEncounterSheetProps) {
  const { register, control, watch, handleSubmit } = useForm<Encounter>();
  const [createEncounter] = useCreateEncounterMutation();
  const { query } = useRouter();

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
      });
      onClose();
    } catch (e) {
      // TOO: handle error
    }
  };
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
        {!!pokemonId && (
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
            alt={pokemonId.toString()}
            width={350}
            height={350}
          />
        )}
        <Button type="submit">Add Encounter</Button>
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
