import { atom, useAtom } from "jotai";

const selectedNuzlockeAtom = atom<{
  id: string;
  title: string;
} | null>(null);

export const useSelectedNuzlocke = () => {
  const [selectedNuzlocke, setSelectedNuzlocke] = useAtom(selectedNuzlockeAtom);

  return {
    selectedNuzlocke,
    setSelectedNuzlocke,
  };
};
