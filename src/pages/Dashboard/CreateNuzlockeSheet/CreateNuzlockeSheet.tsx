import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { z } from "zod";

import Button from "@/components/Button";
import Input from "@/components/Input";

import FormSelect from "@/components/Select/FormSelect";
import FormCombobox from "@/components/Combobox/FormCombobox";

import { NuzlockeType, useCreateNuzlockeMutation } from "generated";

import { GAME_TYPES, POKEMON_GAMES } from "src/const";
import Sheet from "@/components/Sheet";

const nuzlockeSchema = z.object({
  title: z.string(),
  description: z.string(),
  game: z.number(),
  type: z.nativeEnum(NuzlockeType),
});

type Nuzlocke = z.infer<typeof nuzlockeSchema>;

interface CreateNuzlockeSheetProps {
  onClose: () => void;
  open: boolean;
}

function CreateNuzlockeSheet({ open, onClose }: CreateNuzlockeSheetProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Nuzlocke>();

  const router = useRouter();

  const [createNuzlocke] = useCreateNuzlockeMutation();

  const onSubmit = async (data: Nuzlocke) => {
    try {
      const res = await createNuzlocke({
        variables: {
          input: {
            title: data.title,
            description: data.description,
            gameId: +data.game,
            type: data.type,
          },
        },
      });
      router.push(`/nuzlocke/${res.data?.createNuzlocke?.id}`);
    } catch (e) {
      // TODO:  handle error
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
      title="Create Nuzlocke"
      description="Create a new Nuzlocke"
      position="right"
      className="w-full md:w-1/3"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex min-w-[500px] flex-col gap-4"
      >
        <Input
          label="Title"
          {...register("title")}
          helperText={errors?.title?.message}
          state={errors?.title ? "invalid" : undefined}
        />
        <Input
          label="Description"
          {...register("description")}
          helperText={errors?.description?.message}
          state={errors?.description ? "invalid" : undefined}
        />
        <FormCombobox
          name="game"
          control={control}
          popoverClassName="w-96"
          label="Game"
          options={POKEMON_GAMES}
        />
        <FormSelect
          name="type"
          label="Type"
          control={control}
          options={GAME_TYPES}
          state={errors?.type ? "invalid" : undefined}
        />

        <Button size="lg" className="mt-8 w-fit self-end px-10" type="submit">
          Create
        </Button>
      </form>
    </Sheet>
  );
}

export default CreateNuzlockeSheet;
