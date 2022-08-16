import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { trpc } from "../utils/trpc";
import { CourseTable } from "../components/CourseTable";
import { SearchIcon } from "../components/icons/searchIcon";

const Home: NextPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const courses = trpc.useQuery(["courses.getAll"]);
  const deleteCourseMutation = trpc.useMutation("courses.deleteMany", {
    onSuccess: () => {
      courses.refetch();
    },
  });

  const filteredCourses =
    courses.data?.courses.filter((course) => {
      return course.name.toLowerCase().includes(searchInput.toLowerCase());
    }) || [];

  const deleteCourses = async (ids: string[]) => {
    await deleteCourseMutation.mutate(ids);
    return;
  };

  return (
    <>
      <Head>
        <title>Cursos</title>
      </Head>

      <main className="grid gap-10">
        <div className="flex gap-4 py-[14px] px-8 bg-white items-center w-[600px] rounded-full">
          <SearchIcon />
          <input
            className="h-full outline-none flex-1 text1-regular"
            type="text"
            placeholder="Buscar curso..."
            value={searchInput}
            onChange={(ev) => setSearchInput(ev.target.value)}
          />
        </div>

        <CourseTable
          courses={filteredCourses}
          count={courses.data?.count ?? 0}
          deleteCourses={deleteCourses}
        />
        <pre></pre>
      </main>
    </>
  );
};

export default Home;
