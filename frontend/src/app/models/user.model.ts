/*
Generic User object for the Angular frontend with all optional types. Due to the different defaults in 
the PostgreSQL table and types of posts when carrying out CRUD operations, all properties were made 
optional.
*/

export interface User {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
}