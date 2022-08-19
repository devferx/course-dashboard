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
import type { Module, Course } from "@prisma/client";

import { Button } from "./Button";

interface ModulesTableProps {
  modules: (Module & { course: Course })[];
  count: number;
  deleteModules: (ids: string[]) => void;
}

export const ModulesTable = ({
  modules,
  count,
  deleteModules,
}: ModulesTableProps) => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const selectAllModules = () => {
    if (selectedModules.length !== modules.length) {
      setSelectedModules(modules.map((module) => module.id));
      return;
    }

    setSelectedModules([]);
  };

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter((module) => module !== id));
      return;
    }

    setSelectedModules([...selectedModules, id]);
  };

  const onPressDelete = async () => {
    await deleteModules(selectedModules);
    setSelectedModules([]);
  };

  return (
    <div>
      <div className="flex aling-center justify-between">
        <h3 className="heading1">Todos los modulos ({count})</h3>
        <div className="flex gap-4">
          {selectedModules.length > 0 && (
            <Button
              className="py-3 px-6 bg-white rounded-lg text-black text1-semibold border-2 border-black"
              onClick={onPressDelete}
            >
              Eliminar ({selectedModules.length}) modulos
            </Button>
          )}

          <Link href="/new-module">
            <a className="py-3 px-6 bg-black  rounded-lg text-white text1-semibold border-2 border-transparent">
              Agregar modulo
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
                  checked={selectedModules.length === modules.length}
                  onClick={selectAllModules}
                />
              </TableCell>
              <TableCell>
                <span className="text1-semibold">Nombre del curso</span>
              </TableCell>
              <TableCell>
                <span className="text1-semibold">Título</span>
              </TableCell>
              <TableCell>
                <span className="text1-semibold">Orden</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modules.map((module) => (
              <TableRow key={module.id}>
                <TableCell className="py-8">
                  <Checkbox
                    checked={selectedModules.includes(module.id)}
                    onClick={() => toggleModule(module.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 justify-start items-center">
                    <span className="text1-semibold">{module.course.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text1-semibold">{module.title}</span>
                </TableCell>
                <TableCell>
                  <span className="text1-semibold">{module.order}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
