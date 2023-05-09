import { useSearchArticlesQuery } from "generated";
import { signIn } from "next-auth/react";

function Home() {
  const { data } = useSearchArticlesQuery();

  return (
    <div>
      <h1>Web</h1>
      <div>
        {data?.articles?.results?.map((article) => (
          <p key={article.id}> {article.title}</p>
        ))}
      </div>
      <button onClick={() => signIn("discord")}>Login</button>
    </div>
  );
}

export default Home;
