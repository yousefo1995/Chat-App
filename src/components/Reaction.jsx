import { IconButton } from "@mui/material";
import React from "react";

const Reaction = ({ children, message, reaction, handler }) => {
  return (
    <IconButton
      onClick={() => handler(`${reaction}`)}
      sx={{ bgcolor: message.reactions === `${reaction}` && "#5D5B8D" }}
    >
      {children}
    </IconButton>
  );
};

export default Reaction;
