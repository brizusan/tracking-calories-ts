import { useEffect, useReducer } from "react";
import { ActivityList, Header, TrackinCalories } from "./components";
import { activityReducer, initialState } from "./reducers/activity-reducer";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const isEmpty = state.activities.length === 0;

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  return (
    <>
      <Header
        dispatch={dispatch}
        activeId={state.activeId}
        activities={state.activities}
      />
      {!isEmpty && (
        <TrackinCalories 
          activities={state.activities}
        />
      )}

      <ActivityList
        isEmpty={isEmpty}
        activities={state.activities}
        dispatch={dispatch}
      />
    </>
  );
}

export default App;
