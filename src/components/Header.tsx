import type { ActivityActions } from "../reducers/activity-reducer";
import { Activity } from "../types";
import { Formulario } from "./Formulario";

type HeaderProps = {
  dispatch: React.Dispatch<ActivityActions>;
  activeId: Activity["id"];
  activities: Activity[];
};

export const Header = ({ dispatch, activeId, activities }: HeaderProps) => {
  return (
    <>
      <header className="bg-lime-500 py-4">
        <div className="max-w-4xl mx-auto flex justify-between  w-11/12 lg:w-full">
          <h1 className=" text-lg text-white uppercase font-semibold">
            Contador de Calorias
          </h1>
          <button
            onClick={() => {
              const confirm = window.confirm("¿Quieres reiniciar la app?");
              if (confirm) dispatch({ type: "reset-app" });
            }}
            className="bg-slate-800 hover:bg-slate-600 transition-colors text-white px-4 py-2 rounded-md font-semibold"
          >
            Reset App
          </button>
        </div>
      </header>

      <section className="bg-lime-400 py-10 px-5">
        <div className="max-w-4xl mx-auto">
          <Formulario
            dispatch={dispatch}
            activeId={activeId}
            activities={activities}
          />
        </div>
      </section>
    </>
  );
};
