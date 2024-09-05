import { useMemo } from "react";
import  type { Activity } from "../types";

type TrackinCaloriesProps ={
  activities: Activity[]
}

export const TrackinCalories = ({activities}: TrackinCaloriesProps) => {


  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total: number, act: { category: number; calories: number }) =>
          act.category === 1 ? total + act.calories : total,
        0
      ),
    [activities]
  );
  const exercise = useMemo(
    () =>
      activities.reduce(
        (total: number, act: { category: number; calories: number }) =>
          act.category === 2 ? total + act.calories : total,
        0
      ),
    [activities]
  );
  const diferencia = useMemo(()=>caloriesConsumed - exercise,[caloriesConsumed, exercise])

  const isHealty = useMemo(()=>diferencia < 0,[diferencia])

  return (
    <article className="bg-slate-900 py-10">
    <h2 className="text-center text-3xl font-semibold text-white pb-6">
      Resumen de Actividades{" "}
    </h2>
    <div className="max-w-4xl w-11/12 lg:w-full mx-auto flex justify-between">
      <div className="flex flex-col gap-2 text-center text-white">
        <h2 className="text-4xl md:text-6xl font-bold">
          {caloriesConsumed}
        </h2>
        <h3 className="font-semibold tracking-wider">CONSUMIDAS</h3>
      </div>
      <div className="flex flex-col gap-2 text-center text-white">
        <h2 className="text-4xl md:text-6xl font-bold">{exercise}</h2>
        <h3 className="font-semibold tracking-wider uppercase">
          ejercicio
        </h3>
      </div>
      <div className={`flex flex-col gap-2 text-center ${isHealty ? 'text-green-500' : 'text-red-500'}`}>
        <h2 className="text-4xl md:text-6xl font-bold">{diferencia}</h2>
        <h3 className="font-semibold tracking-wider uppercase">
          diferencia
        </h3>
      </div>
    </div>
  </article>
  )
}
