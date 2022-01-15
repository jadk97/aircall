import React, { useState, useContext } from "react";
import { List, ListSubheader, Typography, Grid } from "@mui/material";
import ActivityListItem from "./ActivityListItem";
import format from "date-fns/format";
import { groupByKey } from "../../helpers/groupByKey";
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import { ActivitiesContext } from "../../context/ActivitiesContext";
const ActivityList = ({ activities }) => {
  const { activities: activitiesState } = useContext(ActivitiesContext);

  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState();
  const handleModalClose = () => {
    setOpen(false);
  };

 

  const showDetails = (activity) => {
    setDetails(activity.id);
    setOpen(true);
  };

  const formattedDates = activities.map((activity) => {
    return {
      day: format(new Date(activity.created_at), "MMMM dd, yyyy"),
      ...activity,
    };
  });

  const groupedByDates = groupByKey(formattedDates, "day", { omitKey: false });

  return (
    <Grid item sx={{ height: "100%", width: "100%" }}>
      {Object.keys(groupedByDates).map((day) => {
        return (
          <React.Fragment key={day}>
            <Typography
              textAlign="center"
              sx={{
                fontSize: "0.875rem",
                color: "rgba(0, 0, 0, 0.6)",
                padding: "16px",
              }}
            >
              {day}
            </Typography>
            <List
              sx={{
                borderRadius: "12px",
                border: "solid 1px #DDE1E9",
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              {groupedByDates[day].map((activity, index) => (
                <ActivityListItem
                  withDivider={index !== groupedByDates[day].length - 1}
                  key={activity.id}
                  {...activity}
                  showDetails={() => showDetails(activity)}
                />
              ))}
            </List>
          </React.Fragment>
        );
      })}

      {details && (
        <ActivityDetails
          details={activitiesState.find((activity) => activity.id === details)}
          open={open}
          handleModalClose={handleModalClose}
        />
      )}
    </Grid>
  );
};

export default ActivityList;
