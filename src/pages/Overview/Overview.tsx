import React, { type ReactElement } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { DropdownMenuCheckboxItem } from "@/components/Dropdown/Components";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Table from "@/components/Table";
import Typography from "@/components/Typography";
import EncounterSheet from "@/components/EncounterSheet";
import Layout from "@/components/Layout";

import useGetCurrentNuzlocke from "@/hooks/useGetCurrentNuzlocke";

import {
  GetNuzlockeEncountersQuery,
  Status,
  useGetNuzlockeEncountersQuery,
} from "generated";

const STATUS_READABLE: Record<Status, string> = {
  IN_PC: "PC",
  IN_TEAM: "Team",
  SEEN: "Seen",
  FAINTED: "Fainted",
};

const SEARCH_BY_OPTIONS = [
  { value: "pokemon", label: "Pokemon" },
  { value: "nickname", label: "Nickname" },
  { value: "location", label: "Location" },
  { value: "status", label: "Status" },
];

type Encounter =
  GetNuzlockeEncountersQuery["getNuzlockeEncounters"]["results"][0];

interface OverviewProps {}

function Overview({}: OverviewProps) {
  const [searchBy, setSearchBy] = React.useState(SEARCH_BY_OPTIONS[0].value);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedEncounter, setSelectedEncounter] =
    React.useState<Encounter | null>(null);

  const { currentNuzlocke } = useGetCurrentNuzlocke();

  const { data, refetch } = useGetNuzlockeEncountersQuery({
    variables: {
      nuzlockeId: currentNuzlocke?.id || "",
      input: {
        filter: {
          pokemon: {
            name: {
              contains: "",
            },
          },
        },
      },
    },
  });

  const columnHelper = createColumnHelper<Encounter>();

  const columns = [
    columnHelper.accessor("pokemon", {
      header: "Pokemon",
      cell: (row) => (
        <div className="flex items-center gap-1">
          <Image
            height={30}
            width={30}
            src={row.getValue().sprite}
            alt={row.getValue().name}
          />
          <span className="capitalize">{row.getValue().name}</span>
        </div>
      ),
    }),
    columnHelper.accessor("nickname", {
      header: "Nickname",
    }),
    columnHelper.accessor("location", {
      header: "Location",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (row) => STATUS_READABLE[row.getValue()],
    }),
  ];

  const table = useReactTable({
    data: data?.getNuzlockeEncounters.results || [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: (row) => {
      console.log(row);
    },
  });

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filter =
      searchBy === "pokemon"
        ? {
            pokemon: {
              name: {
                contains: searchValue,
              },
            },
          }
        : {
            [searchBy]: {
              contains: searchValue,
            },
          };

    refetch({
      nuzlockeId: currentNuzlocke?.id || "",
      input: {
        filter: filter,
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h1">Overview</Typography>
      <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="max-w-sm"
        />
        <Select
          value={searchBy}
          onValueChange={(val) => setSearchBy(val)}
          options={SEARCH_BY_OPTIONS}
        />
        <Button className="ml-auto">Search</Button>
        <Dropdown
          content={table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        >
          <Button variant="outline" className="ml-auto">
            Columns
            <ChevronDown className="ml-1 w-4" />
          </Button>
        </Dropdown>
      </form>
      <p>Total {data?.getNuzlockeEncounters?.totalCount}</p>
      <Table<Encounter>
        table={table}
        columnsLength={columns.length}
        onRowClick={(row) => setSelectedEncounter(row)}
      />
      <EncounterSheet
        open={!!selectedEncounter}
        encounterId={selectedEncounter?.id}
        onClose={() => setSelectedEncounter(null)}
      />
    </div>
  );
}

Overview.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Overview;
