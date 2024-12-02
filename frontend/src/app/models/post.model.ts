/*
Generic Post object for the Angular frontend with all optional types. Due to the different defaults in 
the PostgreSQL table and types of posts when carrying out CRUD operations, all properties were made 
optional.
*/

export interface Post {
    id?: number;
    title?: string;
    caption?: string;
    date?: string;
    image?: string;
    score?: number;
}