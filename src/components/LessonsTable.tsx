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
import type { Lesson, Module, Course } from "@prisma/client";

import { Button } from "./Button";

type LessonT = Lesson & {
  module: Module & {
    course: Course;
  };
};

interface LessonsTableProps {
  lessons: LessonT[];
  count: number;
  deleteLessons: (ids: string[]) => void;
}

export const LessonsTable = ({
  lessons,
  count,
  deleteLessons,
}: LessonsTableProps) => {
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);

  const selectAllLessons = () => {
    if (selectedLessons.length !== lessons.length) {
      setSelectedLessons(lessons.map((lesson) => lesson.id));
      return;
    }

    setSelectedLessons([]);
  };

  const toggleModule = (id: string) => {
    if (selectedLessons.includes(id)) {
      setSelectedLessons(selectedLessons.filter((lesson) => lesson !== id));
      return;
    }

    setSelectedLessons([...selectedLessons, id]);
  };

  const onPressDelete = async () => {
    await deleteLessons(selectedLessons);
    setSelectedLessons([]);
  };

  return (
    <div>
      <div className="flex aling-center justify-between">
        <h3 className="heading1">Todas las clases ({count})</h3>
        <div className="flex gap-4">
          {selectedLessons.length > 0 && (
            <Button
              className="py-3 px-6 bg-white rounded-lg text-black text1-semibold border-2 border-black"
              onClick={onPressDelete}
            >
              Eliminar ({selectedLessons.length}) clases
            </Button>
          )}

          <Link href="/new-lesson">
            <a className="py-3 px-6 bg-black  rounded-lg text-white text1-semibold border-2 border-transparent">
              Agregar clase
            </a>
          </Link>
        </div>
      </div>

      <TableContainer className="mt-6" component={Paper}>
        <Table aria-label="lessons table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedLessons.length === lessons.length}
                  onClick={selectAllLessons}
                />
              </TableCell>
              <TableCell>
                <span className="text1-semibold">Nombre del curso</span>
              </TableCell>
              <TableCell>
                <span className="text1-semibold">Slug</span>
              </TableCell>
              <TableCell>
                <span className="text1-semibold">Lesson path</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell className="py-8">
                  <Checkbox
                    checked={selectedLessons.includes(lesson.id)}
                    onClick={() => toggleModule(lesson.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 justify-start items-center">
                    <span className="text1-semibold">
                      {lesson.module.course.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text1-semibold">{lesson.title}</span>
                </TableCell>
                <TableCell>
                  <span className="text1-semibold">{lesson.module.title}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
