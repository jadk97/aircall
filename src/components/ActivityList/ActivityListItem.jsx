import React, { useState } from "react";
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Typography,
  Divider,
} from "@mui/material";

import CallIcon from "@mui/icons-material/Call";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import VoicemailIcon from "@mui/icons-material/Voicemail";
import format from "date-fns/format";

import ActivityListItemButtonSection from "./ActivityListItemButtonSection";

const ActivityListItem = ({
  id,
  call_type,
  created_at,
  direction,
  duration,
  from,
  to,
  is_archived,
  via,
  withDivider,
  showDetails,
  detailsView,
  onClick,
}) => {
  const [clicked, setClicked] = useState(false);
  const renderIcon = () => {
    if (call_type === "answered") {
      return (
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          badgeContent={
            direction === "inbound" ? (
              <CallReceivedIcon sx={{ fontSize: "0.75rem", color: "green" }} />
            ) : (
              <CallMadeIcon sx={{ fontSize: "0.75rem", color: "orange" }} />
            )
          }
        >
          <CallIcon />
        </Badge>
      );
    } else if (call_type === "missed") {
      return <PhoneMissedIcon sx={{ color: "#ff3333" }} />;
    } else {
      return <VoicemailIcon />;
    }
  };

  const renderListText = () => {
    if (call_type === "answered") {
      return `called ${to}`;
    } else if (call_type === "missed") {
      return `tried to call ${to}`;
    } else {
      return `left a voicemail`;
    }
  };

  const renderDetailsText = () => {
    if (call_type === "answered" || call_type === "missed") {
      return `${
        call_type === "missed"
          ? "Missed"
          : direction === "inbound"
          ? "Incoming"
          : "Outgoing"
      } call, duration ${`${(duration / 60) | 0} minutes ${
        duration % 60
      } seconds`}`;
    } else {
      return `Voicemail, duration ${`${(duration / 60) | 0} minutes ${
        duration % 60
      } seconds`}`;
    }
  };
  // onClick={onClick ? onClick : undefined}
  return (
    <Grid
      item
      sx={
        !detailsView
          ? {
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, .05)",
                cursor: "pointer",
              },
            }
          : null
      }
    >
      <ListItem
        onClick={!detailsView ? () => setClicked((prev) => !prev) : undefined}
      >
        <ListItemIcon>{renderIcon(call_type)}</ListItemIcon>
        {detailsView ? (
          <React.Fragment>
            <ListItemText
              primary={format(new Date(created_at), "MMMM dd, yyyy, hh:mm aa")}
              secondary={
                <React.Fragment>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                  >
                    {renderDetailsText()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                  >
                    Via {via}
                  </Typography>
                </React.Fragment>
              }
              secondaryTypographyProps={{ component: "div" }}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ListItemText primary={from} secondary={renderListText()} />
            <Grid item>
              <ListItemText
                secondaryTypographyProps={{ fontSize: "0.75rem" }}
                secondary={format(new Date(created_at), "hh:mm aa")}
              />
            </Grid>
          </React.Fragment>
        )}
      </ListItem>
      {!detailsView && (
        <ActivityListItemButtonSection
          id={id}
          clicked={clicked}
          showDetails={showDetails}
          isArchived={is_archived}
        />
      )}
      {withDivider && <Divider />}
    </Grid>
  );
};

export default ActivityListItem;
