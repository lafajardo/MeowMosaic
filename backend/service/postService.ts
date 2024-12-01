import { Post } from "../models";

const createPost = async (newPost: Post) => {
    return await prisma.post.create({
        data: newPost,
    });
};

const getAllPosts = async () => {
    return await prisma.post.findMany();
}

const getTopFivePosts = async () => {

};

const updatePost = async (postID: number, newPost: Post) => {
    return await prisma.post.update({
        where: {
            id: postID,
        },
        data: newPost,
    });
};

const deletePost = async (postID: number) => {
    return await prisma.post.delete({
        where: {
            id: postID,
        },
    });
};