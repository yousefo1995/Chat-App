import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

const ForwardBox = () => {
  const navigate = useNavigate();
  const forwardedMessage = JSON.parse(localStorage.getItem("forward"));
  const cancelForward = () => {
    localStorage.removeItem("forward");
    navigate("/");
  };
  return (
    <div>
      {forwardedMessage && (
        <Box padding={1}>
          <Box
            border="1px solid #fff"
            borderRadius={1}
            fontSize="large"
            color="#FFF"
            padding={1}
          >
            {forwardedMessage?.type === "text" && (
              <Typography>{forwardedMessage.text}</Typography>
            )}
            {forwardedMessage?.type === "image" && (
              <img
                style={{
                  width: "70px",
                  maxHeight: "40px",
                  border: "1px solid gray",
                  borderRadius: "4px",
                }}
                src={forwardedMessage.img}
                alt=""
              />
            )}
          </Box>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography marginTop={0.4} fontSize="large" color="#FFF">
              Forward to...{" "}
            </Typography>
            <IconButton onClick={cancelForward}>
              <CancelIcon />
            </IconButton>
          </Stack>
        </Box>
      )}
    </div>
  );
};

export default ForwardBox;
