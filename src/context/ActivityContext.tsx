import { createContext, Dispatch, useReducer } from "react";
import {
  ActivityActions,
  activityReducer,
  ActivityState,
  initialState,
} from "../reducers/activity-reducer";

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
  isEmpty: boolean
};

type ActivityProviderProps = {
  children: React.ReactNode;
};

export const ActivityContext = createContext<ActivityContextProps>(
  {} as ActivityContextProps
);

export const ActivityContextProvider = ({ children }: ActivityProviderProps) => {

  const [state , dispatch] = useReducer(activityReducer, initialState);

  const isEmpty = state.activities.length === 0;

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        isEmpty
      }}
    >
      {children}
    </ActivityContext.Provider>
  )

};
