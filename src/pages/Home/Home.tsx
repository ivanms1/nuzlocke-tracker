import { useSearchNuzlockesQuery } from "generated";

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
      <button>Beep</button>
    </div>
  );
}

export default Home;
