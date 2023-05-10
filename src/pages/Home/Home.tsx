import { signIn } from "next-auth/react";

function Home() {
  return (
    <div>
      <h1>Web</h1>

      <button onClick={() => signIn("discord")}>Login</button>
    </div>
  );
}

export default Home;
