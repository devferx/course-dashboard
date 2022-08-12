import { useState } from "react";
import Link from "next/link";
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
              <TableCell>Nombre del curso</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Duración</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCourses.includes(course.id)}
                    onClick={() => toggleCourse(course.id)}
                  />
                </TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.slug}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell> {`${course.price} ${course.currency}`}</TableCell>
                <TableCell>{course.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
