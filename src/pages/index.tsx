import type { NextPage } from "next";
import Head from "next/head";

import { trpc } from "../utils/trpc";
import { CourseTable } from "../components/CourseTable";

const Home: NextPage = () => {
  const courses = trpc.useQuery(["courses.getAll"]);
  const deleteCourseMutation = trpc.useMutation("courses.deleteMany", {
    onSuccess: () => {
      courses.refetch();
    },
  });

  const deleteCourses = async (ids: string[]) => {
    await deleteCourseMutation.mutate(ids);
    return;
  };

  return (
    <>
      <Head>
        <title>Cursos</title>
      </Head>

      <main>
        <CourseTable
          courses={courses.data?.courses ?? []}
          count={courses.data?.count ?? 0}
          deleteCourses={deleteCourses}
        />
        <pre></pre>
      </main>
    </>
  );
};

export default Home;
