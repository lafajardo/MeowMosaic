import { prisma } from './setupClient';
import { CreatePost } from '@shared/types/createPost';
import { UpdatePost } from '@shared/types/updatePost';

export const createPost = async (newPost: CreatePost) => {
    return await prisma.post.create({
        data: {
            title: newPost.title,
            caption: newPost.caption,
            image: newPost.image,
            user: {
                connect: { id: newPost.userID },
            },
        },
    });
};

export const getAllPosts = async () => {
    return await prisma.post.findMany({
        orderBy: { 
            date: 'desc' // order posts by latest
        }, 
      });}

export const getTopFivePosts = async () => {
    return await prisma.post.findMany({
        orderBy: {
            score: 'desc',
        },
        take: 5,
    });
};

export const updatePost = async (postID: number, newPost: UpdatePost) => {
    return await prisma.post.update({
        where: {
            id: postID,
        },
        data: {
            ...(newPost.title && { title: newPost.title }),
            ...(newPost.caption && { caption: newPost.caption })
        },
    });
};

export const deletePost = async (postID: number) => {
    return await prisma.post.delete({
        where: {
            id: postID,
        },
    });
};