/*
User object for updating a user. When updating a user, none of the other fields should be modified and 
some of the fields may stay the same.
*/

export interface UpdateUser {
    username?: string;
    email?: string;
    password?: string;
}