import { ChangeEvent, FormEvent, useEffect, useId, useState } from "react";
import { categories } from "../data";
import type { Activity } from "../types";
import { ActivityActions } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: React.Dispatch<ActivityActions>;
  activeId: Activity["id"];
  activities: Activity[];
};

const initialState = {
  id: null,
  category: 1,
  activity: "",
  calories: 0,
};

export const Formulario = ({ dispatch, activeId, activities }: FormProps) => {
  const [activity, setActivity] = useState<Activity>(initialState);

  const idCategory = useId();
  const idActivity = useId();
  const idCalority = useId();

  useEffect(() => {
    if (activeId) {
      const activityEdit = activities.find((act) => act.id === activeId);
      if (activityEdit) {
        setActivity(activityEdit);
      }
    }
  }, [activeId, activities]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const isNumberField = ["calories", "category"].includes(event.target.name);

    setActivity({
      ...activity,
      [event.target.name]: isNumberField
        ? Number(event.target.value)
        : event.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      Object.values(activity).includes("") ||
      Object.values(activity).includes(0)
    ) {
      alert("Todos los campos son obligatorios");
    } else {
      const newActivity = {
        ...activity,
        id: crypto.randomUUID(),
      };

      dispatch({ type: "add-activity", payload: { newActivity } });
      alertaEnvio();
      setTimeout(() => {
        setActivity(initialState);
      }, 1000);
    }
  };

  const alertaEnvio = () =>
    activeId ? alert("Actualizando Actividad") : alert("Agregando Actividad");

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white shadow p-8 rounded-md max-w-xl mx-auto"
    >
      <legend className="text-2xl text-slate-800 font-semibold text-center">
        Ingresa tus datos
      </legend>
      <div className="flex flex-col gap-1">
        <label
          htmlFor={idCategory}
          className="font-semibold text-slate-800 uppercase"
        >
          Categoria:
        </label>

        <select
          name="category"
          id={idCategory}
          value={activity.category}
          className="text-center border border-gray-400 rounded py-1 px-3"
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor={idActivity}
          className="font-semibold text-slate-800 uppercase"
        >
          Actividad:
        </label>
        <input
          type="text"
          name="activity"
          id={idActivity}
          value={activity.activity}
          className="text-center  border border-gray-400 rounded py-2 px-3"
          placeholder="ej. Ejercicio , correr campo , salir a caminar.."
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor={idCalority}
          className="font-semibold text-slate-800 uppercase"
        >
          Calorias:
        </label>
        <input
          type="text"
          name="calories"
          id={idCalority}
          value={activity.calories}
          className="text-center  border border-gray-400 rounded py-2 px-3"
          placeholder="ej. 5000 , 3000 , 1000.."
          onChange={handleChange}
        />
      </div>
      <div className="pt-4">
        <input
          type="submit"
          value={`${activeId ? "Actualizar Actividad" : "Guardar Actividad"}`}
          className="max-w-md mx-auto block w-full py-2 rounded-md shadow text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer uppercase font-semibold"
        />
      </div>
    </form>
  );
};
