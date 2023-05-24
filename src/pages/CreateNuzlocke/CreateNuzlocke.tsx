import React from "react";
import { z } from "zod";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Typography from "@/components/Typography";

import FormSelect from "@/components/Select/FormSelect";
import FormCombobox from "@/components/Combobox/FormCombobox";

import { NuzlockeType, useCreateNuzlockeMutation } from "generated";

import { GAME_TYPES, POKEMON_GAMES } from "src/const";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const nuzlockeSchema = z.object({
  title: z.string(),
  description: z.string(),
  game: z.number(),
  type: z.nativeEnum(NuzlockeType),
});

type Nuzlocke = z.infer<typeof nuzlockeSchema>;

function CreateNuzlocke() {
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
    <div className="flex h-full ">
      <div className="flex h-full w-1/2 flex-col justify-center gap-10">
        <Typography variant="h1" className="align">
          Create Nuzlocke
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-96 flex-col gap-4"
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
          <FormSelect
            name="type"
            label="Type"
            control={control}
            options={GAME_TYPES}
            state={errors?.type ? "invalid" : undefined}
          />
          <FormCombobox
            name="game"
            control={control}
            popoverClassName="w-96"
            label="Game"
            options={POKEMON_GAMES}
          />
          <Button size="lg" className="mt-8 w-fit self-end px-10" type="submit">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateNuzlocke;
