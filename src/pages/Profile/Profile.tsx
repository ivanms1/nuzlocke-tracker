import React from "react";

import styles from "./Profile.module.scss";

interface ProfileProps {}

const Profile = ({}: ProfileProps) => {
  return <div className={styles.Profile}>Profile</div>;
};

export default Profile;
