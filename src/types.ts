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

export interface LessonToCreate {
  ordinalNumber: number;
  type: LessonType;
  themeId: number;
}

export interface HtmlLessonToCreate extends LessonToCreate {
  html: string;
}

export interface VideoLessonToCreate extends LessonToCreate {
  videoUrl: string;
}

export interface CodeLessonToCreate extends LessonToCreate {
  condition: string;
  codeTests: CodeTest[];
}

export interface TestLessonToCreate extends LessonToCreate {
  condition: string;
  possibleAnswers: string[];
  answer: string;
}

export interface MultiTestLessonToCreate extends LessonToCreate {
  condition: string;
  possibleAnswers: string[];
  correctAnswers: string[];
}

export type AnyLessonToCreate =
  | HtmlLessonToCreate
  | VideoLessonToCreate
  | TestLessonToCreate
  | MultiTestLessonToCreate
  | CodeLessonToCreate;

export interface Lesson extends LessonToCreate {
  id?: number;
  wasChanged: boolean;
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

export interface ShortLesson {
  id: number;
  ordinalNumber: number;
}

export interface ThemeToCreate {
  title: string;
  description: string;
  ordinalNumber: number;
  moduleId: number;
  contentType: string;
}

export interface ThemeToGet extends ThemeToCreate {
  id?: number;
  lessons: ShortLesson[];
}

export interface Theme extends ThemeToGet {
  wasChanged: boolean;
  fullLessons: AnyLesson[];
}

export interface ModuleToCreate {
  title: string;
  description: string;
  ordinalNumber: number;
  courseId: number;
}

export interface ModuleToGet extends ModuleToCreate {
  id?: number;
}

export interface Module extends ModuleToGet {
  wasChanged: boolean;
  newThemeTitle: string;
  themes: Theme[];
}

export interface CourseToCreate {
  title: string;
  description: string;
  completionTimeInHours: number;
  logo?: string;
}

export interface Course extends CourseToCreate {
  id: number;
  createdAt: string;
  authorId: number;
}

export interface LessonProgress {
  lessonId: number;
  completed: boolean;
}

export interface ThemeProgress {
  themeId: number;
  completed: boolean;
  lessonProgress: LessonProgress[];
}

export interface ModuleProgress {
  moduleId: number;
  completed: boolean;
  themeProgress: LessonProgress[];
}

export interface ExtendCourseProgress {
  courseId: number;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  completed: boolean;
  moduleProgresses: ModuleProgress[];
}
