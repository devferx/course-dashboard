import { useState } from "react";
import type { NextPage } from "next";

import { SearchInput } from "../components/SearchInput";
import { trpc } from "../utils/trpc";
import { LessonsTable } from "../components/LessonsTable";

const LessonsPage: NextPage = () => {
  const lessons = trpc.useQuery(["lessons.getAll"]);
  const deleteManyLessonsMutation = trpc.useMutation(["lessons.deleteMany"]);
  const [searchInput, setSearchInput] = useState("");

  const filteredLessons =
    lessons.data?.lessons?.filter((lesson) => {
      return lesson.title.toLowerCase().includes(searchInput.toLowerCase());
    }) ?? [];

  const deleteManyLessons = (ids: string[]) => {
    deleteManyLessonsMutation.mutate(ids, {
      onSuccess: () => {
        lessons.refetch();
      },
    });
  };

  return (
    <>
      <main className="grid gap-10">
        <SearchInput
          value={searchInput}
          onChange={(ev) => setSearchInput(ev.target.value)}
          placeholder="Buscar clase"
        />

        <LessonsTable
          lessons={filteredLessons}
          count={lessons.data?.count ?? 0}
          deleteLessons={deleteManyLessons}
        />
      </main>
    </>
  );
};

export default LessonsPage;
