import { type ReactElement } from "react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import TeamCard from "@/components/TeamCard";
import Typography from "@/components/Typography";

import useGetCurrentNuzlocke from "@/hooks/useGetCurrentNuzlocke";

import { Status, useGetNuzlockeEncountersQuery } from "generated";

function Pc() {
  const { currentNuzlocke } = useGetCurrentNuzlocke();

  const { data, refetch } = useGetNuzlockeEncountersQuery({
    variables: {
      nuzlockeId: currentNuzlocke?.id as string,
      input: {
        filter: {
          status: Status.InPc,
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
          status: Status.InPc,
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
      <Typography variant="h1">PC</Typography>

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
          if (encounter.status !== Status.InPc) {
            return null;
          }
          return <TeamCard key={encounter.id} encounter={encounter} small />;
        })}
      </div>
    </div>
  );
}

Pc.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Pc;
