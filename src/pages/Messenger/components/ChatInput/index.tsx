import { Box, TextField, IconButton } from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Иконка для прикрепления файлов
import SendIcon from '@mui/icons-material/Send';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  attachment: File | null;
  setAttachment: (file: File | null) => void;
  handleSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, setAttachment, handleSend }) => {
    return (
        <Box
            sx={{
                width: '100%',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 2,
                backgroundColor: '#fff', // Фон для инпута
                borderRadius: '0 0 8px 0',
                
            }}
        >
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Введите сообщение..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                sx={{ flexGrow: 1, marginRight: 1 }}
                InputProps={{
                    endAdornment: (
                        <>
                            <IconButton
                                component="label"
                                onClick={() => document.getElementById('file-input')?.click()} // Открытие диалога выбора файла
                            >
                                <AttachFileIcon />
                                <input
                                    id="file-input"
                                    type="file"
                                    hidden
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setAttachment(e.target.files[0]);
                                        }
                                    }}
                                />
                            </IconButton>
                            <IconButton onClick={handleSend}>
                                <SendIcon />
                            </IconButton>
                        </>
                    ),
                }}
            />
        </Box>
    );
};

export default ChatInput;