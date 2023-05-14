import React from "react";
import Link from "next/link";

import { useSearchNuzlockesQuery } from "generated";
import { buttonVariants } from "@/components/Button/Button";
import Typography from "@/components/Typography";

interface ProfileProps {}

function Profile({}: ProfileProps) {
  const { data } = useSearchNuzlockesQuery();
  return (
    <div>
      <Typography variant="h1">Profile</Typography>
      {data?.searchNuzlockes?.results?.map((nuzlocke) => (
        <Link href={`/nuzlocke/${nuzlocke.id}`} key={nuzlocke.id}>
          {nuzlocke.title}
        </Link>
      ))}
      <Link href="/create-nuzlocke" className={buttonVariants()}>
        Create Nuzlocke
      </Link>
    </div>
  );
}

export default Profile;
