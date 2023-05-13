import React from "react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Typography from "@/components/Typography";
import Combobox from "@/components/Combobox";

interface CreateNuzlockeProps {}

function CreateNuzlocke({}: CreateNuzlockeProps) {
  const [game, setGame] = React.useState("");
  return (
    <div className="flex flex-col gap-10">
      <Typography variant="h1" className="align">
        Create Nuzlocke
      </Typography>
      <form className="flex w-96 flex-col gap-4">
        <Input label="Title" />
        <Input label="Description" />
        <Combobox
          value={game}
          onChange={(value) => setGame(value)}
          label="Game"
          options={POKEMON_GAMES}
        />
        <Button size="lg" className="mt-8 w-fit self-end px-10" type="submit">
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateNuzlocke;

const POKEMON_GAMES = [
  {
    label: "Red",
    value: "red",
  },
  {
    label: "Blue",
    value: "blue",
  },
  {
    label: "Yellow",
    value: "yellow",
  },
  {
    label: "Gold",
    value: "gold",
  },
  {
    label: "Silver",
    value: "silver",
  },
  {
    label: "Crystal",
    value: "crystal",
  },
  {
    label: "Ruby",
    value: "ruby",
  },
  {
    label: "Sapphire",
    value: "sapphire",
  },
  {
    label: "Emerald",
    value: "emerald",
  },
  {
    label: "FireRed",
    value: "firered",
  },
  {
    label: "LeafGreen",
    value: "leafgreen",
  },
  {
    label: "Diamond",
    value: "diamond",
  },
  {
    label: "Pearl",
    value: "pearl",
  },
  {
    label: "Platinum",
    value: "platinum",
  },
  {
    label: "HeartGold",
    value: "heartgold",
  },
  {
    label: "SoulSilver",
    value: "soulsilver",
  },
  {
    label: "Black",
    value: "black",
  },
  {
    label: "White",
    value: "white",
  },
  {
    label: "Black 2",
    value: "black2",
  },
  {
    label: "White 2",
    value: "white2",
  },
  {
    label: "X",
    value: "x",
  },
  {
    label: "Y",
    value: "y",
  },
  {
    label: "Omega Ruby",
    value: "omegaruby",
  },
  {
    label: "Alpha Sapphire",
    value: "alphasapphire",
  },
  {
    label: "Sun",
    value: "sun",
  },
  {
    label: "Moon",
    value: "moon",
  },
  {
    label: "Ultra Sun",
    value: "ultrasun",
  },
  {
    label: "Ultra Moon",
    value: "ultramoon",
  },
  {
    label: "Let's Go Pikachu",
    value: "letsgopikachu",
  },
  {
    label: "Let's Go Eevee",
    value: "letsgoeevee",
  },
  {
    label: "Sword",
    value: "sword",
  },
  {
    label: "Shield",
    value: "shield",
  },
  {
    label: "Brilliant Diamond",
    value: "brilliantdiamond",
  },
  {
    label: "Shining Pearl",
    value: "shiningpearl",
  },
  {
    label: "Legends: Arceus",
    value: "legendsarceus",
  },
];
