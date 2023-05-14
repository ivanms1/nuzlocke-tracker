import { useGetNuzlockeQuery } from "generated";
import { useRouter } from "next/router";
import React from "react";

interface NuzlockeProps {}

function Nuzlocke({}: NuzlockeProps) {
  const { query } = useRouter();
  const { data } = useGetNuzlockeQuery({
    variables: {
      id: query.id as string,
    },
  });

  console.log("herer", data);
  return <div className="">Nuzlocke</div>;
}

export default Nuzlocke;
