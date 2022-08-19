import { useState } from "react";
import type { ChangeEvent } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

import { FormControl } from "../components/FormControl";
import { FormSelect } from "../components/FormSelect";
import { Button } from "../components/Button";

const NewModulePage: NextPage = () => {
  const { data: courses, isLoading, error } = trpc.useQuery(["courses.getAll"]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    courseId: "",
    order: 0,
  });
  const router = useRouter();

  const createModuleMutation = trpc.useMutation("modules.create");

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onCancel = () => {
    router.push("/modules");
  };

  const saveForm = () => {
    createModuleMutation.mutate(
      { ...form, order: Number(form.order) },
      {
        onSuccess: () => {
          router.push("/modules");
        },
      }
    );
  };

  if (error) {
    console.error(error);
    return <div>Servicio no disponible en este momento</div>;
  }

  return (
    <>
      <h1 className="heading1">Nuevo modulo</h1>

      <form className="mt-6 max-w-2xl" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-8">
          <FormControl
            labelText="Título"
            name="title"
            value={form.title}
            onChange={onChange}
          />
          <FormControl
            labelText="Slug"
            name="slug"
            value={form.slug}
            onChange={onChange}
          />

          <FormSelect
            name="courseId"
            label="Curso"
            value={form.courseId}
            onChange={onChange}
            options={
              courses?.courses?.map((course) => ({
                label: course.name,
                value: course.id,
              })) || [{ label: "Cargando...", value: "" }]
            }
          />

          <FormControl
            labelText="Orden"
            name="order"
            type="number"
            value={form.order}
            onChange={(ev) => onChange(ev)}
          />
        </div>

        <div className="flex gap-4 mt-8">
          <Button typeStyle="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" onClick={saveForm}>
            Guardar
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewModulePage;
