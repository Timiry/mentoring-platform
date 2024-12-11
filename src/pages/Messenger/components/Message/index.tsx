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
              display: 'flex',
              justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
              marginBottom: 1,
          }}
      >
          <Box
              sx={{
                  maxWidth: '70%',
                  padding: 1,
                  borderRadius: 1,
                  backgroundColor: isCurrentUser ? '#e1f5fe' : '#f1f1f1',
              }}
          >
              <Typography variant="body1">{message.content.message}</Typography>
              <Typography variant="B7Regular">{message.sentAt}</Typography>
              {/* {message.body.attachmentUrl && <img src={message.body.attachmentUrl} alt="Attachment" style={{ maxWidth: '100%' }} />} */}
          </Box>
      </Box>
  );
};

export default Message;