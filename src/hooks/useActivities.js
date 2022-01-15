import { useState } from "react";

export const useActivities = () => {
  const [activities, setActivities] = useState([]);

  const archiveAllCalls = (data) => {
    if (data && data.length > 0) {
      let callIds = new Set(data.map((newData) => newData.id));
      let mergedCalls = [
        ...data,
        ...activities.filter((activity) => !callIds.has(activity.id)),
      ];
      let sorted = mergedCalls.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      setActivities(sorted);
    } else {
      // update optimistically
      const allArchived = activities.map((activity) => ({
        ...activity,
        is_archived: true,
      }));
      setActivities(allArchived);
    }
  };

  const restoreAllCalls = (data) => {
    if (data && data.length > 0) {
      let callIds = new Set(data.map((newData) => newData.id));
      let mergedCalls = [
        ...data,
        ...activities.filter((activity) => !callIds.has(activity.id)),
      ];

      let sorted = mergedCalls.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      setActivities(sorted);
    }
    else {
      // update optimistically

      const allRestored = activities.map((activity) => ({
        ...activity,
        is_archived: false,
      }));

      setActivities(allRestored);
    }
  };

  const setActivityArchivedStatus = ({ activityId, archivedStatus, data }) => {
    let allActivitiesCopy = [...activities];
    let activityToModifyIndex = allActivitiesCopy.findIndex(
      (activity) => activity.id === activityId
    );

    if (data) {
      allActivitiesCopy[activityToModifyIndex] = {
        is_archived: archivedStatus,
        ...data,
      };
    } else {
      // update optimistically
      allActivitiesCopy[activityToModifyIndex].is_archived = archivedStatus;
    }

    setActivities(allActivitiesCopy);
  };

  return {
    activities,
    setActivities,
    archiveAllCalls,
    restoreAllCalls,
    setActivityArchivedStatus,
  };
};
