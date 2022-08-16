import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from "@mui/material";
import type { Course } from "@prisma/client";

import { Button } from "./Button";

interface CourseTableProps {
  courses: Course[];
  count: number;
  deleteCourses: (ids: string[]) => void;
}

export const CourseTable = ({
  courses,
  count,
  deleteCourses,
}: CourseTableProps) => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const selectAllCourses = () => {
    if (selectedCourses.length !== courses.length) {
      setSelectedCourses(courses.map((course) => course.id));
      return;
    }

    setSelectedCourses([]);
  };

  const toggleCourse = (id: string) => {
    if (selectedCourses.includes(id)) {
      setSelectedCourses(selectedCourses.filter((course) => course !== id));
      return;
    }

    setSelectedCourses([...selectedCourses, id]);
  };

  const onPressDelete = async () => {
    await deleteCourses(selectedCourses);
    setSelectedCourses([]);
  };

  return (
    <>
      <div className="flex aling-center justify-between">
        <h3 className="heading1">Todos los cursos ({count})</h3>
        <div className="flex gap-4">
          {selectedCourses.length > 0 && (
            <Button
              className="py-3 px-6 bg-white rounded-lg text-black text1-semibold border-2 border-black"
              onClick={onPressDelete}
            >
              Eliminar ({selectedCourses.length}) cursos
            </Button>
          )}

          <Link href="/new-course">
            <a className="py-3 px-6 bg-black  rounded-lg text-white text1-semibold border-2 border-transparent">
              Agregar curso
            </a>
          </Link>
        </div>
      </div>

      <TableContainer className="mt-6" component={Paper}>
        <Table aria-label="courses table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedCourses.length === courses.length}
                  onClick={selectAllCourses}
                />
              </TableCell>
              <TableCell>
                <span className="text1-semibold">Nombre del curso</span>
              </TableCell>
              <TableCell>
                <span className="text1-semibold">Slug</span>
              </TableCell>
              <TableCell>
                <span className="text1-semibold">Status</span>
              </TableCell>
              <TableCell>
                <span className="text1-semibold">Precio</span>
              </TableCell>
              <TableCell>
                <span className="text1-semibold">Duración</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="py-8">
                  <Checkbox
                    checked={selectedCourses.includes(course.id)}
                    onClick={() => toggleCourse(course.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 justify-start items-center">
                    <Image
                      className="h-8 w-8 object-cover"
                      src={course.imageUrl}
                      width={48}
                      height={48}
                      alt={`${course.name} icon`}
                    />
                    <span className="text1-semibold">{course.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text1-semibold">{course.slug}</span>
                </TableCell>
                <TableCell>
                  <span
                    className={`${
                      course.status === "PUBLISHED" ? "bg-green" : "bg-gray3"
                    } py-4 px-6 rounded-full text2-regular text-white`}
                  >
                    {course.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`bg-[#6E1DD6] py-4 px-6 rounded-full text2-regular text-white`}
                  >
                    {`${course.price} ${course.currency}`}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text1-semibold">{course.duration} hr</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
