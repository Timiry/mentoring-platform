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
    userStatus: string,
}

export interface MentorData
{
    "userId": number,
    "shortAboutMe": string,
    "longAboutMe": string,
    "specializations": Array<string>,
}

