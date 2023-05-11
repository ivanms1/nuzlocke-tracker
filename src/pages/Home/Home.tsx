import { signIn } from "next-auth/react";

function Home() {
  return (
    <div>
      <h1 className="bg-amber-400 text-2xl">Web</h1>

      <button onClick={() => signIn("discord")}>Login</button>
    </div>
  );
}

export default Home;
