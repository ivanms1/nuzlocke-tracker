import TeamCard from "@/components/TeamCard";
import Typography from "@/components/Typography";
import Input from "@/components/Input";
import Button from "@/components/Button";

import useGetCurrentNuzlocke from "@/hooks/useGetCurrentNuzlocke";
import { useGetNuzlockeEncountersQuery, Status } from "generated";

function Missed() {
  const { currentNuzlocke } = useGetCurrentNuzlocke();

  const { data, refetch } = useGetNuzlockeEncountersQuery({
    variables: {
      nuzlockeId: currentNuzlocke?.id as string,
      input: {
        filter: {
          status: Status.Seen,
        },
      },
    },
    skip: !currentNuzlocke?.id,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch({
      nuzlockeId: currentNuzlocke?.id as string,
      input: {
        filter: {
          status: Status.Seen,
          OR: [
            {
              location: {
                contains: e.currentTarget.search.value,
              },
            },
            {
              pokemon: {
                name: {
                  contains: e.currentTarget.search.value,
                },
              },
            },
            {
              nickname: {
                contains: e.currentTarget.search.value,
              },
            },
          ],
        },
      },
    });
  };
  return (
    <div className="flex flex-col gap-8">
      <Typography variant="h1">Missed</Typography>
      <form className="flex gap-8" onSubmit={handleSearch}>
        <Input
          name="search"
          wrapperClassName="max-w-sm"
          placeholder="Search..."
        />
        <Button>Search</Button>
      </form>
      <Typography variant="p">
        Total {data?.getNuzlockeEncounters?.totalCount}
      </Typography>
      <div className="flex flex-wrap gap-4">
        {data?.getNuzlockeEncounters?.results?.map((encounter) => {
          return <TeamCard key={encounter.id} encounter={encounter} small />;
        })}
      </div>
    </div>
  );
}

export default Missed;
