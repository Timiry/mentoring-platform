export interface RegisterData {
  login: string;
  email: string;
  password: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface AccountData {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  address: string | null;
  photoUrl: string | null;
  registrationDate: string;
  userStatus?: string;
}

export interface MentorDataToCreate {
  userId: number;
  shortAboutMe: string;
  longAboutMe: string;
  specializations: string[];
}

export interface RawMentorData {
  userId: number;
  shortAboutMe: string;
  longAboutMe: string;
  specializations: string;
}

export interface MentorDataToShow {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  shortAboutMe: string;
  longAboutMe: string;
  specializations: string[];
  studentsCount: number;
  avatarUrl: string;
}

export interface MessageData {
  id?: string;
  chatId?: string;
  senderId: number;
  content: {
    message?: string;
    fileUrl?: string;
  };
  messageType?: string;
  sentAt: string;
}

export interface ChatData {
  id: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
}

export enum LessonType {
  HTML,
  VIDEO,
  TEST,
  MULTI_TEST,
  CODE,
}

export interface Lesson {
  id?: number;
  ordinalNumber: number;
  type: LessonType;
}

export interface HtmlLesson extends Lesson {
  html: string;
}

export interface VideoLesson extends Lesson {
  videoUrl: string;
}

interface CodeTest {
  input: string;
  output: string;
}

export interface CodeLesson extends Lesson {
  condition: string;
  codeTests: CodeTest[];
}

export interface TestLesson extends Lesson {
  condition: string;
  possibleAnswers: string[];
  answer: string;
}

export interface MultiTestLesson extends Lesson {
  condition: string;
  possibleAnswers: string[];
  correctAnswers: string[];
}

export type AnyLesson =
  | HtmlLesson
  | VideoLesson
  | TestLesson
  | MultiTestLesson
  | CodeLesson;

export interface Theme {
  id?: number; // ID может быть неопределенным для новых тем
  title: string;
  lessons: AnyLesson[];
  ordinalNumber: number; // Порядковый номер темы
}

export interface Module {
  id?: number; // ID может быть неопределенным для новых модулей
  title: string;
  originalTitle: string;
  themes: Theme[];
  newThemeTitle: string; // Новое поле для хранения названия новой темы
  ordinalNumber: number; // Порядковый номер модуля
}
