import React, { type ReactElement } from "react";

import Layout from "@/components/Layout";
import Typography from "@/components/Typography";

import { useGetCurrentUserQuery } from "generated";
import Button from "@/components/Button";

function Profile() {
  const { data } = useGetCurrentUserQuery();
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h1">Profile</Typography>
      <div>
        <Typography variant="h4">username</Typography>
        <Typography>{data?.getCurrentUser.name}</Typography>
      </div>
      <div>
        <Typography variant="h4">email</Typography>
        <Typography>{data?.getCurrentUser.email}</Typography>
      </div>
      <Button
        size="sm"
        className="w-fit self-end border-destructive text-destructive hover:bg-destructive/90"
        variant="outline"
      >
        Delete Account
      </Button>
    </div>
  );
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
