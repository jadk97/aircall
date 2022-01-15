import React, { useContext, useState } from "react";
import PopupModal from "./PopupModal";
import {
  Grid,
  Avatar,
  Typography,
  List,
  ListItem,
  ListSubheader,
} from "@mui/material";
import ActivityListItem from "../ActivityList/ActivityListItem";
import axios from "axios";
import { ActivitiesContext } from "../../context/ActivitiesContext";
import ArchiveIcon from "@mui/icons-material/Archive";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import Button from "../Button/Button";
import CloseIcon from "@mui/icons-material/Close";
const ActivityDetails = ({ open, handleModalClose, details }) => {
  const { activities, setActivityArchivedStatus } =
    useContext(ActivitiesContext);

  const [loading, setLoading] = useState(false);

  const archiveButtonHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://aircall-job.herokuapp.com/activities/${details.id}`,
        { is_archived: true }
      );
      setLoading(false);
      setActivityArchivedStatus({
        activityId: details.id,
        archivedStatus: true,
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const restoreButtonHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://aircall-job.herokuapp.com/activities/${details.id}`,
        { is_archived: false }
      );
      setLoading(false);
      setActivityArchivedStatus({
        activityId: details.id,
        archivedStatus: false,
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PopupModal
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={handleModalClose}
      customButtonSection={
        <Grid container item justifyContent="space-between">
          <Grid item>
            <Button
              solid
              disabled={loading}
              alignIcon="start"
              icon={<CloseIcon />}
              onClick={handleModalClose}
            >
              Close
            </Button>
          </Grid>
          {details.is_archived ? (
            <Grid item>
              <Button
                disabled={loading}
                alignIcon="start"
                icon={<SettingsBackupRestoreIcon />}
                onClick={restoreButtonHandler}
              >
                Unarchive
              </Button>
            </Grid>
          ) : (
            <Grid item>
              <Button
                disabled={loading}
                alignIcon="start"
                icon={<ArchiveIcon />}
                onClick={archiveButtonHandler}
              >
                Archive
              </Button>
            </Grid>
          )}
        </Grid>
      }
    >
      <Grid
        spacing={2}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        item
      >
        <Grid item>
          <Avatar sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item>
          <Typography sx={{ fontSize: "1.25rem" }}>{details.from}</Typography>
        </Grid>
      </Grid>
      <ActivityListItem {...details} detailsView />
    </PopupModal>
  );
};

export default ActivityDetails;
