export interface RegisterData
{
    login: string,
    email: string,
    password: string,
}

export interface LoginData
{
    login: string,
    password: string,
}

export interface AccountData
{
    id: number,
    username: string,
    firstName: string | null,
    lastName: string | null,
    phone: string | null,
    address: string | null,
    photoUrl: string | null,
    registrationDate: string,
    userStatus?: string,
}

export interface MentorDataToCreate
{
    userId: number,
    shortAboutMe: string,
    longAboutMe: string,
    specializations: string[],
}

export interface RawMentorData
{
    userId: number,
    shortAboutMe: string,
    longAboutMe: string,
    specializations: string,
}

export interface MentorDataToShow
{
    userId: number,
    username: string,
    firstName: string,
    lastName: string,
    shortAboutMe: string,
    longAboutMe: string,
    specializations: string[],
    studentsCount: number,
    avatarUrl: string,
}

export interface MessageData {
    id?: string,
    chatId?: string,
    senderId: number,
    content: {
        message?: string,
        fileUrl?: string,
    },
    messageType?: string,
    sentAt: string,
}

export interface ChatData {
    id: string;
    avatarUrl: string;
    firstName: string;
    lastName: string;
}