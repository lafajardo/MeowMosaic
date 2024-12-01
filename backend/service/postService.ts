import { CreatePost } from '@shared/createPost';

const createPost = async (newPost: CreatePost) => {
    return await prisma.post.create({
        data: newPost,
    });
};

const getAllPosts = async () => {
    return await prisma.post.findMany();
}

const getTopFivePosts = async () => {

};

const updatePost = async (postID: number, newPost: UpdatePost) => {
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