import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  const courses = trpc.useQuery(["courses.getAll"]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul>
          {courses.data?.map((course) => (
            <li className="heading1" key={course.id}>
              {course.name}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;
