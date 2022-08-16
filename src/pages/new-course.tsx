import { useState } from "react";
import type { ChangeEvent } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { CourseStatus } from "@prisma/client";

import { FormControl } from "../components/FormControl";
import { FormSelect } from "../components/FormSelect";
import { Button } from "../components/Button";

interface FormI {
  name: string;
  slug: string;
  status: CourseStatus;
  teacher: string;
  duration: number;
  price: number;
  currency: string;
  imageUrl: string;
  description: string;
}

const NewCoursePage: NextPage = () => {
  const [form, setForm] = useState<FormI>({
    name: "",
    slug: "",
    status: CourseStatus.DRAFT,
    teacher: "",
    duration: 0,
    price: 0,
    currency: "",
    imageUrl: "",
    description: "",
  });

  const {
    data: teachers,
    isLoading,
    error,
  } = trpc.useQuery(["users.getTeachers"]);
  const createCourseMutation = trpc.useMutation("courses.create");
  const router = useRouter();

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    isNumber = false
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onCancel = () => {
    router.push("/");
  };

  const saveForm = () => {
    createCourseMutation.mutate(
      { ...form, duration: Number(form.duration), price: Number(form.price) },
      {
        onSuccess: (resp) => {
          console.log(resp);
          router.push("/");
        },
      }
    );
  };

  if (error) {
    console.log(error);
    return <div>Servicio no disponible en este momento</div>;
  }

  return (
    <>
      <h1 className="heading1">Nuevo curso</h1>

      <form className="mt-6 max-w-2xl" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-8">
          <FormControl
            labelText="Nombre del curso"
            name="name"
            value={form.name}
            onChange={onChange}
          />
          <FormControl
            labelText="Slug"
            name="slug"
            value={form.slug}
            onChange={onChange}
          />

          <FormSelect
            name="status"
            label="Estatus"
            value={form.status}
            onChange={onChange}
            options={[
              {
                label: "Draft",
                value: CourseStatus.DRAFT,
              },
              {
                label: "Publicado",
                value: CourseStatus.PUBLISHED,
              },
            ]}
          />

          <FormSelect
            name="teacher"
            label="Profesor"
            value={form.teacher}
            onChange={onChange}
            options={
              teachers?.map((teacher) => ({
                label: teacher.name,
                value: teacher.id,
              })) || [{ label: "Cargando...", value: "" }]
            }
          />

          <FormControl
            labelText="Duración en horas"
            name="duration"
            type="number"
            value={form.duration}
            onChange={(ev) => onChange(ev, true)}
          />
          <FormControl
            labelText="Precio"
            name="price"
            type="number"
            value={form.price}
            onChange={(ev) => onChange(ev, true)}
          />
          <FormControl
            labelText="Código de moneda"
            name="currency"
            value={form.currency}
            onChange={onChange}
          />
          <FormControl
            labelText="Imagen url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={onChange}
          />
        </div>

        <div className="flex flex-col gap-[6px] my-8">
          <label className="text2-medium" htmlFor="courseDescription">
            Descripción del curso
          </label>
          <textarea
            className="resize-y min-h-[128px] p-3 rounded-[4px]"
            name="description"
            id="courseDescription"
            value={form.description}
            onChange={onChange}
          ></textarea>
        </div>

        <div className="flex gap-4">
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

export default NewCoursePage;
