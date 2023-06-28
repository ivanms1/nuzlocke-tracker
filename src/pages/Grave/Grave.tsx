import TeamCard from "@/components/TeamCard";
import Typography from "@/components/Typography";
import Input from "@/components/Input";
import Button from "@/components/Button";

import useGetCurrentNuzlocke from "@/hooks/useGetCurrentNuzlocke";
import { useGetNuzlockeEncountersQuery, Status } from "generated";

function Grave() {
  const { currentNuzlocke } = useGetCurrentNuzlocke();

  const { data, refetch } = useGetNuzlockeEncountersQuery({
    variables: {
      nuzlockeId: currentNuzlocke?.id as string,
      input: {
        filter: {
          status: Status.Fainted,
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
          status: Status.Fainted,
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

  console.log("data", data?.getNuzlockeEncounters?.results);
  return (
    <div className="flex flex-col gap-8">
      <Typography variant="h1">Grave</Typography>
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
          if (encounter.status !== Status.Fainted) {
            return null;
          }
          return <TeamCard key={encounter.id} encounter={encounter} small />;
        })}
      </div>
    </div>
  );
}

export default Grave;
