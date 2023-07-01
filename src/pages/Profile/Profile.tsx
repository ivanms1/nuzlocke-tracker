import React, { type ReactElement } from "react";

import Layout from "@/components/Layout";

interface ProfileProps {}

function Profile({}: ProfileProps) {
  return <div className="">Profile</div>;
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
