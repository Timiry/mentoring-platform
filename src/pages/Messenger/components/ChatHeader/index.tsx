import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemIcon,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  communicationApi,
  coursesApi,
  mentorCatalogApi,
  progressApi,
} from "../../../../api";
import { useParams } from "react-router-dom";
import { AccountData, Course, MentorDataToCreate } from "../../../../types";

const ChatHeader = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [member, setMember] = useState<AccountData>();
  const [memberRole, setMemberRole] = useState<string>("");
  const [mentorInfo, setMentorInfo] = useState<MentorDataToCreate>();
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!chatId) return;
      const members = await communicationApi.getChatUsers(chatId);
      const member = members.data.content.find(
        (m: AccountData) => m.id != localStorage.userId
      );
      setMember(member);
      const mentorInfoResponse = await mentorCatalogApi.getMentorById(
        localStorage.userId
      );
      setMentorInfo(mentorInfoResponse.data);
      if (mentorInfoResponse.status === 404) {
        const isMentorResponse = await mentorCatalogApi.isStudentHasMentor(
          localStorage.userId,
          member.id
        );
        if (isMentorResponse.data === true) setMemberRole("Ваш ментор");
      } else if (mentorInfoResponse.status === 200) {
        const isStudentResponse = await mentorCatalogApi.isStudentHasMentor(
          member.id,
          localStorage.userId
        );
        if (isStudentResponse.data === true) setMemberRole("Ваш ученик");
        const mentorsCoursesResponse =
          await coursesApi.getPublishedCoursesByAuthor(localStorage.userId);
        setMyCourses(mentorsCoursesResponse.data);
      }
    };

    fetchUserData();
  }, [chatId]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderRadius: "0 8px 0 0",
        borderBottom: "1px solid #ccc",
      }}
    >
      {member ? (
        <ListItem
          component={Box}
          secondaryAction={
            <Box>
              {mentorInfo ? (
                <Button
                  variant="outlined"
                  sx={{
                    color: "button.primary",
                    borderColor: "button.primary",
                  }}
                  onClick={handleOpenDialog}
                >
                  Зачислить на курс
                </Button>
              ) : (
                <></>
              )}
            </Box>
          }
        >
          <ListItemAvatar>
            <Avatar
              src={member.photoUrl || ""}
              alt={`${member.firstName} ${member.lastName}`}
            />
          </ListItemAvatar>
          <ListItemText
            primary={`${member.firstName} ${member.lastName} ${memberRole ? "| " + memberRole : ""}`}
          />
        </ListItem>
      ) : (
        <></>
      )}
      {/* Модальное окно для выбора типа урока */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Выберите курс для зачисления ученика</DialogTitle>
        <DialogContent>
          <List>
            {myCourses.length
              ? myCourses.map((course) => (
                  <ListItem
                    key={course.id}
                    component={Button}
                    sx={{
                      color: "black",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                    onClick={() => {
                      if (member) {
                        // mentorCatalogApi.addStudentToMentor(
                        //   localStorage.userId,
                        //   member.id
                        // );
                        progressApi.assignUserToCourse(course.id, member.id);
                      }
                      handleCloseDialog();
                    }}
                  >
                    <ListItemIcon>
                      <img
                        src={course.logo}
                        alt={course.title}
                        style={{ width: 50, height: 50, borderRadius: "4px" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={course.title} />
                  </ListItem>
                ))
              : "У вас пока нет опубликованных курсов, создайте их в разделе Преподавание"}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "button.primary",
            }}
            onClick={handleCloseDialog}
          >
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatHeader;
