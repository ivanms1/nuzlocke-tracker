import { useRouter } from "next/router";

import { useGetCurrentNuzlockeQuery } from "generated";
import { useSelectedNuzlocke } from "src/state/selectedNuzlocke";

function useGetCurrentNuzlocke() {
  const { selectedNuzlocke, setSelectedNuzlocke } = useSelectedNuzlocke();

  const router = useRouter();

  const { data, loading, error } = useGetCurrentNuzlockeQuery({
    variables: {
      id: router?.query?.id as string,
    },
    skip: !router?.query?.id,
    onCompleted: (data) => {
      if (data?.getNuzlocke && !selectedNuzlocke) {
        setSelectedNuzlocke({
          id: data.getNuzlocke.id,
          title: data.getNuzlocke.title,
        });
      }
    },
  });
  return {
    currentNuzlocke: data?.getNuzlocke,
    error,
    loading,
  };
}

export default useGetCurrentNuzlocke;
