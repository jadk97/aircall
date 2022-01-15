import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header/Header";
import ActivityList from "./components/ActivityList/ActivityList";
import {
  Grid,
  CircularProgress,
  Typography,
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ActivityTabSection from "./components/ActivityTabSection/ActivityTabSection";
import theme from "./utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ArchiveIcon from "@mui/icons-material/Archive";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { ActivitiesContext } from "./context/ActivitiesContext";
import { useActivities } from "./hooks/useActivities";
import EmptyList from "./components/ActivityList/EmptyList";
import Button from "./components/Button/Button";
const App = () => {
  // const [activities, setActivities] = useState([]);
  const {
    activities,
    setActivities,
    archiveAllCalls,
    restoreAllCalls,
    setActivityArchivedStatus,
  } = useActivities();
  const [loading, setLoading] = useState(true);
  const [archiveAllLoading, setArchiveAllLoading] = useState(false);
  const [restoreAllLoading, setRestoreAllLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const inboxedActivities = activities.filter(
    (activity) => !activity.is_archived
  );
  const archivedActivities = activities.filter(
    (activity) => activity.is_archived
  );

  useEffect(() => {
    const getActivities = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://aircall-job.herokuapp.com/activities"
        );
        

        setActivities(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (activities.length === 0) {
      getActivities();
    }
  }, []);

  const handleArchiveAll = async () => {
    try {
      setArchiveAllLoading(true);
      let finalResult = [];
      for (let activity of inboxedActivities) {
        const { data } = await axios.post(
          `https://aircall-job.herokuapp.com/activities/${activity.id}`,
          { is_archived: true }
        );
        finalResult.push(data);
    
      }
      setArchiveAllLoading(false);
     
      archiveAllCalls(finalResult);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestoreAll = async () => {
    try {
      setRestoreAllLoading(true);
      let finalResult = [];
      for (let activity of archivedActivities) {
        const { data } = await axios.post(
          `https://aircall-job.herokuapp.com/activities/${activity.id}`,
          { is_archived: false }
        );
        finalResult.push(data);
      
      }
      setRestoreAllLoading(false);
     
      restoreAllCalls(finalResult);
    } catch (error) {
      console.log(error);
    }
  };

  const tabPages = [
    inboxedActivities.length > 0 ? (
      <React.Fragment>
        <ListItem
          onClick={handleArchiveAll}
          component="div"
          sx={{
            borderRadius: "12px",
            border: "solid 1px #DDE1E9",
            paddingTop: "16px",
            paddingBottom: "16px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, .05)",
              cursor: "pointer",
            },
          }}
        >
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>

          <ListItemText primary="Archive all calls" />
        </ListItem>
        <ActivityList activities={inboxedActivities} />
      </React.Fragment>
    ) : (
      <EmptyList />
    ),
    archivedActivities.length > 0 ? (
      <React.Fragment>
        <ListItem
          onClick={handleRestoreAll}
          component="div"
          sx={{
            borderRadius: "12px",
            border: "solid 1px #DDE1E9",
            paddingTop: "16px",
            paddingBottom: "16px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, .05)",
              cursor: "pointer",
            },
          }}
        >
          <ListItemIcon>
            <SettingsBackupRestoreIcon />
          </ListItemIcon>

          <ListItemText primary="Unarchive all calls" />
        </ListItem>
        <ActivityList activities={archivedActivities} />
      </React.Fragment>
    ) : (
      <EmptyList />
    ),
  ];

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        setActivities,
        archiveAllCalls,
        restoreAllCalls,
        setActivityArchivedStatus,
      }}
    >
      <ThemeProvider theme={theme}>
        <div className="container">
          <Header />
          <ActivityTabSection
            tabIndex={tabIndex}
            handleTabChange={handleTabChange}
            tabHeaders={["Inbox", "Archive"]}
          />
          <div className="container-view">
            <Grid
              direction="column"
              container
              item
              justifyContent="center"
              alignItems="center"
              alignContent="center"
            >
              {loading || archiveAllLoading || restoreAllLoading ? (
                <React.Fragment>
                  <Grid item>
                    <CircularProgress size={48} sx={{ color: "#2AC420" }} />
                  </Grid>
                  {archiveAllLoading && (
                    <Grid item>
                      <Typography>Archiving all calls...</Typography>
                    </Grid>
                  )}
                  {restoreAllLoading && (
                    <Grid item>
                      <Typography>Unarchiving all calls...</Typography>
                    </Grid>
                  )}
                </React.Fragment>
              ) : (
                tabPages[tabIndex]
              )}
            </Grid>
          </div>
        </div>
      </ThemeProvider>
    </ActivitiesContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
