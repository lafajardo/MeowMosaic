// Model defining expected shape of a user object.

export interface User {
    id: number | null;
    username: string;
    email: string;
    password: string;
}