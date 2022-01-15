import React from "react";
import MUIPopover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
const Popover = (props) => {
  const popoverClasses = {
    root: {
      pointerEvents: "none",
      marginTop: "8px",
    },
    paper: {
      padding: (theme) => theme.spacing(1),
    },
  };
  // const popoverClasses = popoverStyles();
  return (
    <MUIPopover
      id={props.id}
      sx={popoverClasses.root}
      PaperProps={{
        sx: popoverClasses.paper,
      }}
      open={props.open}
      anchorEl={props.anchorEl}
      anchorOrigin={props.anchorOrigin}
      transformOrigin={props.transformOrigin}
      disableRestoreFocus
      TransitionProps={props.TransitionProps}
    >
      <Typography>{props.popoverLabel}</Typography>
    </MUIPopover>
  );
};

export default Popover;
