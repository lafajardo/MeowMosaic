// Model defining expected shape of a post object.

export interface Post {
    id: number | null;
    title: string;
    caption: string;
    date: string | null;
    image: string;
    score: number | null;
}