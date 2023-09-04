import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const ReplyBox = ({
  setShowReply,
  showCloseButton = true,
  radiusTop,
  name,
  text,
  img,
}) => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-around"
      bgcolor="#fff"
      padding={0.5}
      position="sticky"
      bottom="0"
      minWidth="120px"
      borderRadius={radiusTop && "10px 10px 0 0"}
    >
      <Stack
        width="85%"
        bgcolor="#E4E7EA"
        alignItems="end"
        borderRadius={2}
        borderLeft="5px solid #2f2d52"
        paddingRight={1.5}
      >
        <Typography color="#5D5B8D" fontSize="small" fontWeight={700}>
          {name}
        </Typography>
        <img src={img} alt="" style={{ maxWidth: "40px" }} />
        <Typography fontWeight={500}>{text}</Typography>
      </Stack>
      <Stack width="7%" alignItems="center" justifyContent="center">
        {showCloseButton && (
          <IconButton onClick={() => setShowReply(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
};

export default ReplyBox;
