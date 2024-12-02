/*
Post object for creating a post. When creating a post, all of these fields are required. The rest will 
be filled with default values.
*/

export interface CreatePost {
    title: string;
    caption: string;
    image: string;
}
