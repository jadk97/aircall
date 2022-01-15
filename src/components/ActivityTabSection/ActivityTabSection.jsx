import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Tabs, Tab } from "@mui/material";

const ActivityTabSection = ({ tabIndex, handleTabChange, tabHeaders }) => {
  return (
    <Tabs
      value={tabIndex}
      onChange={handleTabChange}
      indicatorColor="secondary"
      aria-label="secondary tabs example"
      variant="fullWidth"
      TabIndicatorProps={{
        sx: { background: "#2AC420" },
      }}
      TabScrollButtonProps={{
        style: { color: "#2AC420" },
      }}
    >
      {tabHeaders.map((tabHeader, index) => (
        <Tab key={`${tabHeader}-${index}`} value={index} label={tabHeader} />
      ))}
    </Tabs>
  );
};

export default ActivityTabSection;
