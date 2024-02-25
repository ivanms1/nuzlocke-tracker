import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import Input from "@/components/Input";

import FormSelect from "@/components/Select/FormSelect";
import FormCombobox from "@/components/Combobox/FormCombobox";

import { NuzlockeType, useCreateNuzlockeMutation } from "generated";

import { GAME_TYPES, POKEMON_GAMES } from "src/const";
import Sheet from "@/components/Sheet";

const nuzlockeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  game: z.number().min(1),
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
  } = useForm<Nuzlocke>({
    resolver: zodResolver(nuzlockeSchema),
    defaultValues: {
      title: "",
      description: "",
      game: 1,
      type: NuzlockeType.Normal,
    },
  });

  const router = useRouter();

  const [createNuzlocke, { loading }] = useCreateNuzlockeMutation();

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
          error={errors?.title?.message}
        />
        <Input
          label="Description"
          {...register("description")}
          error={errors?.description?.message}
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
        />

        <Button
          size="lg"
          className="mt-8 w-fit min-w-[140px] self-end px-10"
          isLoading={loading}
          type="submit"
        >
          Create
        </Button>
      </form>
    </Sheet>
  );
}

export default CreateNuzlockeSheet;
