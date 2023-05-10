import React from "react";

import styles from "./Profile.module.scss";
import { signOut } from "next-auth/react";
import { useSearchNuzlockesQuery } from "generated";

interface ProfileProps {}

const Profile = ({}: ProfileProps) => {
  const { data } = useSearchNuzlockesQuery();
  return (
    <div className={styles.Profile}>
      Profile
      <button onClick={() => signOut()}>loguout</button>
      {data?.searchNuzlockes?.results?.map((nuzlocke) => (
        <p key={nuzlocke.id}> {nuzlocke.title}</p>
      ))}
    </div>
  );
};

export default Profile;
