/*
User object for creating a user. When creating a user, all of these fields are required. The rest will 
be filled with default values.
*/

export interface CreateUser {
    username: string;
    email: string;
    password: string;
}
