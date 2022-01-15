import React from "react";
import MUIButton from "@mui/material/Button";
const Button = (props) => {
  const buttonClasses = {
    button: {
      color: "#2AC420",
      padding: "12px 32px",
      borderRadius: "12px",
      border: "solid 2px #2AC420",
      fontSize: "16px",
      fontWeight: 400,
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: 1.3,
      letterSpacing: "normal",
      textTransform: "none",
      "&:hover:not(.disabled)": {
        color: "white",
        backgroundColor: "#2AC420",
        borderColor: "#2AC420",
      },

      "&.Mui-disabled": {
        background: "grey",
        backgroundColor: "grey",
        border: "solid 2px grey",
        color: "black",
      },
    },

    disabled: {
      background: "grey",
      backgroundColor: "grey",
      border: "solid 2px grey",
      color: "black",
      // borderColor: "black",
    },

    solid: {
      color: "#ffffff",

      backgroundColor: "#2AC420",

      "&:hover:not(.Muidisabled)": {
        backgroundColor: "#299E21",
        borderColor: "#299E21",
      },
    },
  };
  return (
    <MUIButton
      type={props.type}
      href={props.href}
      target={props.href && props.newTab && "_blank"}
      rel={props.href && props.newTab && "noopener noreferrer"}
      fullWidth={props.fullWidth}
      disabled={props.disabled}
      onClick={props.onClick ? props.onClick : undefined}
      sx={{
        ...buttonClasses.button,
        ...(props.solid && buttonClasses.solid),
        ...(props.disabled && buttonClasses.disabled),
      }}
      className={`$`}
      startIcon={props.alignIcon === "start" && props.icon}
      endIcon={(!props.alignIcon || props.alignIcon === "end") && props.icon}
    >
      {props.children}
    </MUIButton>
  );
};

export default Button;
