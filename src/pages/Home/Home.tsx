import { signIn } from "next-auth/react";

import Button from "@/components/Button";
import Typography from "@/components/Typography";

function Home() {
  return (
    <div className="p-4 lg:p-24">
      <div className="flex flex-col items-center gap-4">
        <Typography variant="h1">Nuzlocke Tracker</Typography>
        <Typography variant="h3">
          A simple way to track your nuzlocke runs
        </Typography>
        <Button size="lg" onClick={() => signIn("discord")}>
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default Home;
