import { createContext } from "react";

export const ActivitiesContext = createContext({
  activities: [],
  archiveAllCalls: () => {},
  restoreAllCalls: () => {},
  setActivityArchivedStatus: () => {},
});
