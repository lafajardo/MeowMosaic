import { express } from "../app";
import { createPost, getAllPosts, getTopFivePosts, updatePost, deletePost } from '../service/postService';
import { Response, Request } from 'express';

const postAPI = express.Router();

postAPI.post('/create-post', async (req: Request, res: Response) => {
    try {
        const { title, caption, image, userID } = req.body;
        if (!title || !caption || !image || !userID) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newPost = await createPost({ title, caption, image, userID });
        res.status(201).json({
            message: 'Post created successfully.',
            post: newPost,
        });
    } catch (err) {
        console.error("Error creating post:", err);
        return res.status(500).json({ message: 'Internal server error. Post not created.' });
    }
});

postAPI.get('/feed', async (req: Request, res: Response) => {
    try {
        const posts = await getAllPosts();
        res.status(200).json({
            message: 'Feed posts found.',
            posts: posts,
        });
    } catch (err) {
        return res.status(400).json({ message: 'Error retrieving posts.' });
    }
    });

postAPI.get('/leaderboard', async (req: Request, res: Response) => {
    try {
        const topPosts = await getTopFivePosts();
        res.status(200).json({
            message: 'Top five posts found',
            topPosts: topPosts
        });
    } catch (err) {
        return res.status(400).json({ message: 'Error retrieving top five posts.' });
    }
});

// Update post
postAPI.put('/:id', async(req: Request, res: Response) => {
    try {
        const { title, caption } = req.body;
        const updatedPost = await updatePost(Number(req.params.id), { title, caption });
        res.status(200).json({
            message: 'Post updated successfully.',
            post: { title: updatedPost.title, caption: updatedPost.caption },  
        });
    } catch (err) {
        return res.status(400).json({ message: 'Post not updated.' });
    }
});

postAPI.delete('/:id', async (req: Request, res: Response) => {
    try {
        await deletePost(Number(req.params.id));
        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (err) {
        return res.status(400).json({ message: 'Error deleting Post.' });
    } 
});

module.exports = postAPI;