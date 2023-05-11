import React from "react";
import { signOut } from "next-auth/react";

import { useSearchNuzlockesQuery } from "generated";

interface ProfileProps {}

function Profile({}: ProfileProps) {
  const { data } = useSearchNuzlockesQuery();
  return (
    <div>
      <p className="text-2xl">Profile</p>
      <button onClick={() => signOut()}>log out</button>
      {data?.searchNuzlockes?.results?.map((nuzlocke) => (
        <p key={nuzlocke.id}> {nuzlocke.title}</p>
      ))}
    </div>
  );
}

export default Profile;
