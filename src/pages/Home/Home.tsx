import { useSearchNuzlockesQuery } from "generated";
import { signIn } from "next-auth/react";

function Home() {
  const { data } = useSearchNuzlockesQuery();
  return (
    <div>
      <h1>Web</h1>
      <div>
        {data?.searchNuzlockes?.results?.map((nuzlocke) => (
          <p key={nuzlocke.id}> {nuzlocke.title}</p>
        ))}
      </div>
      <button onClick={() => signIn("discord")}>Login</button>
    </div>
  );
}

export default Home;
