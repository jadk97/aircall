import React from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Grid, Typography, Avatar } from "@mui/material";

const EmptyList = () => {
  return (
    <Grid
      direction="column"
      container
      item
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      spacing={2}
    >
      <Grid item>
        <Avatar sx={{ backgroundColor: "#2AC420" }}>
          <QuestionMarkIcon
            sx={{ fontSize: "2rem", color: "white", textAlign: "center" }}
          />
        </Avatar>
      </Grid>
      <Grid item>
        <Typography>Nothing here...yet!</Typography>
      </Grid>
    </Grid>
  );
};

export default EmptyList;
