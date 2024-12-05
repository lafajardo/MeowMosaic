/*
Post object for updating a post. When updating a post, none of the other fields should be modified and 
some of the fields may stay the same.
*/

export interface UpdatePost {
    title?: string;
    caption?: string;
    score?: number;
}
