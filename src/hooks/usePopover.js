import { useState, useCallback } from 'react';

export const usePopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverLabel, setPopoverLabel] = useState(null);
  const open = Boolean(anchorEl && popoverLabel);

  const handlePopoverOpen = (event, label) => {
    setPopoverLabel(label);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleExited = () => {
    setPopoverLabel(null);
  };

  return { anchorEl, popoverLabel, open, handlePopoverOpen, handlePopoverClose, handleExited };
};
