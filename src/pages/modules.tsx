import { useState } from "react";
import type { NextPage } from "next";

import { trpc } from "../utils/trpc";
import { ModulesTable } from "../components/ModulesTable";
import { SearchInput } from "../components/SearchInput";

const ModulesPage: NextPage = () => {
  const modules = trpc.useQuery(["modules.getAll"]);
  const [searchInput, setSearchInput] = useState("");

  const deleteManyModulesMutation = trpc.useMutation(["modules.deleteMany"], {
    onSuccess: () => {
      modules.refetch();
    },
    onError: (error) => {
      console.error(error);
      alert("Algo salio mal");
    },
  });

  const deleteManyModules = (ids: string[]) => {
    deleteManyModulesMutation.mutate(ids);
  };

  const filteredModules =
    modules.data?.modules.filter((module) => {
      return module.title.toLowerCase().includes(searchInput.toLowerCase());
    }) ?? [];

  return (
    <>
      <main className="grid gap-10">
        <SearchInput
          value={searchInput}
          onChange={(ev) => setSearchInput(ev.target.value)}
        />
        <ModulesTable
          count={modules.data?.count ?? 0}
          deleteModules={deleteManyModules}
          modules={filteredModules}
        />
      </main>
    </>
  );
};

export default ModulesPage;
