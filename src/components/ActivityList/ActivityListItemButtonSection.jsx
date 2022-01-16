import React, { useContext, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import ArchiveIcon from "@mui/icons-material/Archive";
import WifiCallingIcon from "@mui/icons-material/WifiCalling";
import { usePopover } from "../../hooks/usePopover";
import Popover from "../Popover/Popover";
import { Grid, Collapse, IconButton, CircularProgress } from "@mui/material";
import { ActivitiesContext } from "../../context/ActivitiesContext";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import axios from "axios";

const ActivityListItemButtonSection = ({
  id,
  clicked,
  showDetails,
  isArchived,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    anchorEl,
    popoverLabel,
    open,
    handlePopoverClose,
    handlePopoverOpen,
    handleExited,
  } = usePopover();

  const { activities, setActivityArchivedStatus } =
    useContext(ActivitiesContext);

  const handleArchiveClick = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://aircall-job.herokuapp.com/activities/${id}`,
        { is_archived: true }
      );

      setLoading(false);
      setActivityArchivedStatus({
        activityId: id,
        archivedStatus: true,
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestoreClick = async () => {
    try {
      const { data } = await axios.post(
        `https://aircall-job.herokuapp.com/activities/${id}`,
        { is_archived: false }
      );
      setLoading(false);
      setActivityArchivedStatus({
        activityId: id,
        archivedStatus: false,
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Collapse in={clicked}>
        <Grid
          container
          item
          alignItems="center"
          alignContent="center"
          justifyContent="space-around"
        >
          <IconButton
            onMouseEnter={(event) => handlePopoverOpen(event, "Aircall")}
            onMouseLeave={handlePopoverClose}
          >
            <WifiCallingIcon
              sx={{
                flexGrow: 0,
                padding: "4px",
                borderRadius: "40px",
                backgroundColor: "transparent",
                cursor: "pointer",
                "&:hover": {
                  color: "#2AC420",
                  transition: "color 0.2s ease",
                },
              }}
            />
          </IconButton>
          {isArchived ? (
            <IconButton
              onClick={handleRestoreClick}
              onMouseEnter={(event) => handlePopoverOpen(event, "Unarchive")}
              onMouseLeave={handlePopoverClose}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#2AC420" }} />
              ) : (
                <SettingsBackupRestoreIcon
                  sx={{
                    flexGrow: 0,
                    padding: "4px",
                    borderRadius: "40px",
                    // color: "#2AC420",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#2AC420",
                      transition: "color 0.2s ease",
                    },
                  }}
                />
              )}
            </IconButton>
          ) : (
            <IconButton
              onClick={handleArchiveClick}
              onMouseEnter={(event) => handlePopoverOpen(event, "Archive")}
              onMouseLeave={handlePopoverClose}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#2AC420" }} />
              ) : (
                <ArchiveIcon
                  sx={{
                    flexGrow: 0,
                    padding: "4px",
                    borderRadius: "40px",
                    // color: "#2AC420",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#2AC420",
                      transition: "color 0.2s ease",
                    },
                  }}
                />
              )}
            </IconButton>
          )}
          <IconButton
            onClick={showDetails ? showDetails : undefined}
            onMouseEnter={(event) => handlePopoverOpen(event, "Details")}
            onMouseLeave={handlePopoverClose}
          >
            <InfoIcon
              sx={{
                flexGrow: 0,
                padding: "4px",
                borderRadius: "40px",
                // color: "#2AC420",
                backgroundColor: "transparent",
                cursor: "pointer",
                "&:hover": {
                  color: "#2AC420",
                  transition: "color 0.2s ease",
                },
              }}
            />
          </IconButton>
        </Grid>
      </Collapse>
      <Popover
        id={`activity-${id}-button-popover`}
        open={open}
        anchorEl={anchorEl}
        popoverLabel={popoverLabel}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionProps={{ onExited: handleExited }}
      />
    </React.Fragment>
  );
};

export default ActivityListItemButtonSection;
