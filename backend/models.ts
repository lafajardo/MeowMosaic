export interface Post {
    id: number | null;
    title: string;
    caption: string;
    date: Date | null;
    image: string;
    score: number | null;
}

export interface User {
    id: number | null;
    username: string;
    email: string;
    password: string;
}