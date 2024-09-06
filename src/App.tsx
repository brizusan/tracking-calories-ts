import { useEffect } from "react";
import { ActivityList, Header, TrackinCalories } from "./components";
import { useActivity } from "./hooks/useActivity";

function App() {

  const {isEmpty , state} = useActivity()

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  return (
    <>
      <Header />
      {!isEmpty && (
        <TrackinCalories 
          activities={state.activities}
        />
      )}

      <ActivityList />
    </>
  );
}

export default App;
