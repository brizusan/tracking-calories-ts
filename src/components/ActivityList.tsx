import { useMemo } from "react";
import type { Activity } from "../types";
import { categories } from "../data";
import { Edit } from "./icons/Edit";
import { Delete } from "./icons/Delete";
import { ActivityActions } from "../reducers/activity-reducer";

type ActivityListProps = {
  isEmpty: boolean;
  activities: Activity[];
  dispatch: React.Dispatch<ActivityActions>;
};

export const ActivityList = ({ isEmpty, activities , dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    []
  );

  return (
    <main className="max-w-4xl mx-auto my-12">
      <h1 className="text-center text-3xl font-bold text-slate-700">
        {isEmpty ? "No hay actividades" : "Comida y Actividades"}
      </h1>

      <section className="grid grid-cols-1 gap-10 pt-10">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="relative flex justify-between items-center  border border-slate-200 px-6 pt-8 pb-6 bg-white rounded-md shadow"
          >
            <div className="flex flex-col gap-3">
              <p
                className={`font-semibold text-lg p-2 ${
                  activity.category === 1 ? "bg-lime-400" : "bg-red-500"
                } text-white w-[150px] text-center absolute -top-6 -left-2`}
              >
                {categoryName(activity.category)}
              </p>
              <p className="text-slate-500 font-semibold text-2xl capitalize ">
                {activity.activity}
              </p>
              <p className="text-lime-400 font-bold uppercase text-5xl">
                {activity.calories} <span className="capitalize">Cal</span>
              </p>
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => dispatch({ type: "edit-activity", payload: { id: activity.id } })} 
                className="text-blue-600">
                <Edit />
              </button>
              <button
                onClick={() => dispatch({ type: "delete-activity", payload: { id: activity.id } })}
                className="text-red-500"
              >
                <Delete />
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};
