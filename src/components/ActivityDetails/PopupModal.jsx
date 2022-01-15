import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";

import Button from "../Button/Button";
import CloseIcon from "@mui/icons-material/Close";

const PopupModal = (props) => {
  const popupModalClasses = {
    dialogContent: {
      // padding: 0,
      padding: '32px 24px',
      backgroundColor: "white",
      ...(props.noBorder && {
        border: 0,
      }),
    },
    dialogTitle: {
      backgroundColor: "#1c3249",
      color: "white",
    },
    paper: {
      backgroundColor: "transparent",
    },
    dialogActions: {
      backgroundColor: "white",
    },
  };

  return (
    <Dialog
      fullWidth={props.fullWidth}
      maxWidth={props.maxWidth}
      open={props.open}
      onClose={props.onClose}
      scroll={"paper"}
      PaperProps={{ sx: popupModalClasses.paper }}
    >
      <DialogContent
        id="popup-modal-content"
        dividers
        sx={popupModalClasses.dialogContent}
      >
        {props.children}
      </DialogContent>
      <DialogActions sx={popupModalClasses.dialogActions}>
        {props.customButtonSection ? (
          props.customButtonSection
        ) : (
          <Button
            onClick={props.onClose}
            icon={<CloseIcon />}
            alignIcon="start"
          >
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PopupModal;
