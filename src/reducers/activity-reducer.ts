import type { Activity } from "../types";

export type ActivityActions =
  | { type: "add-activity"; payload: { newActivity: Activity } }
  | { type: "edit-activity"; payload: { id: Activity["id"] } }
  | { type: "delete-activity"; payload: { id: Activity["id"] } }
  | { type:"reset-app"};

type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const storageActivities = ()=>{
  const activitiesLS = localStorage.getItem("activities");
  return activitiesLS ? JSON.parse(activitiesLS) : []
}

export const initialState = {
  activities: storageActivities(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "add-activity") {
    let updateActivities: Activity[] = [];

    if (state.activeId) {
      updateActivities = state.activities.map((act) =>
        act.id === state.activeId ? action.payload.newActivity : act
      );
    } else {
      updateActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updateActivities,
      activeId: "",
    };
  }

  if (action.type === "edit-activity") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }


  if(action.type === "delete-activity"){
    return {
      ...state,
      activities: state.activities.filter(act => act.id !== action.payload.id),
      activeId: ""
    }
  }

  if(action.type === "reset-app"){
    return {
      ...state,
      activities: [],
      activeId: ""
    }
  }

  return state;
};
