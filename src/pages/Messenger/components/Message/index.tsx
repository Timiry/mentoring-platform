import { Box, Typography } from "@mui/material";
import { MessageData } from "../../../../types";

interface MessageProps {
  message: MessageData;
  isCurrentUser: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isCurrentUser }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isCurrentUser ? "flex-end" : "flex-start",
        margin: 1,
      }}
    >
      <Box
        sx={{
          maxWidth: "70%",
          padding: "7px 20px",
          borderRadius: 2,
          backgroundColor: isCurrentUser ? "#CFE9D1" : "#f1f1f1",
          display: "flex",
          flexDirection:
            message.content.message && message.content.message.length < 50
              ? "row"
              : "column",
          alignItems: "flex-end",
        }}
      >
        <Typography
          variant="B6Medium"
          sx={{
            maxWidth: "100%",
            whiteSpace: "normal",
            overflowWrap: "break-word",
          }}
        >
          {message.content.message}
        </Typography>
        {message.content.fileUrl && (
          <img
            src={message.content.fileUrl}
            alt="Attachment"
            style={{ maxWidth: "350px" }}
          />
        )}
        <Typography variant="B7Regular" ml={1} mt={"4px"}>
          {message.sentAt}
        </Typography>
      </Box>
    </Box>
  );
};

export default Message;
