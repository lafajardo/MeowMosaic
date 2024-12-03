import { Response, Request } from 'express';
import axios from 'axios';
import { createUser, getUserByID, updateUser, deleteUser, getUserPosts } from '../service/userService';

import { express } from '../app';
import { passport } from '../app';

interface AuthenticatedRequest extends Request {
    session: any;
    isAuthenticated: () => boolean;
    logout: (callback?: (err?: any) => void) => void;
    login: (user: any, callback?: (err?: any) => void) => void;
    user?: any;
}

const userAPI = express.Router();

userAPI.post('/verify-email', async (req: Request, res: Response) => {
    const { email } = req.body;
    const apiKey = '1TkpaYyVcEehRrkVtSsyb'; // Replace with your actual API key
    const apiUrl = `https://apps.emaillistverify.com/api/verifyEmail?secret=${apiKey}&email=${email}`;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const response = await axios.get(apiUrl);
        const  result  = response.data;

        res.status(200).json({ result });
    } catch (err) {
        return res.status(400).json({ message: 'Email validation failed.' });
    }
});

userAPI.post('/login', (req: AuthenticatedRequest, res: Response) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error', error: err });
        }
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed', error: info ? info.message : 'Unknown error' });
        }
        req.login(user, (err: any) => {
            if (err) {
                return res.status(500).json({ message: 'Login failed', error: err });
            }
            return res.status(200).json({ message: 'Login successful!', user: req.user });
        });
    })(req, res);
});

userAPI.post('/create-acct', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const newUser = await createUser({ username, email, password });
        res.status(201).json({
            message: 'User created successfully.',
            user: { id: newUser.id, username: newUser.username, email: newUser.email },
        });
    } catch (err) {
        return res.status(400).json({ message: 'User not created.' });
    }
});

userAPI.get('/posts/:id', async (req: Request, res: Response) => {
    try {
        const subject = await getUserPosts(Number(req.params.id));
        res.status(200).json({
            message: 'User posts found.',
            user: { posts: subject.posts },
        });
    } catch (err) {
        return res.status(400).json({ message: 'Error retrieving posts.' });
    }
});

userAPI.get('/logout', (req: AuthenticatedRequest, res: Response) => {
    req.logout((err: { message: any; }) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed.', error: err.message });
        }
        res.clearCookie('connect.sid', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        res.status(200).json({ message: 'Logout successful' });
    });
});

userAPI.get('/authenticated', (req: AuthenticatedRequest, res: Response) => {
    if (req.isAuthenticated()) {
        res.json({
            message: 'User is authenticated',
            user: req.user
        });
    } else {
        res.status(401).json({
            message: 'User not authenticated',
            user: null
        });
    }
});

userAPI.put('/:id', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const updatedUser = await updateUser(Number(req.params.id), { username, email, password });
        res.status(200).json({
            message: 'User updated successfully.',
            user: { id: updatedUser.id, username: updatedUser.username, email: updatedUser.email },
        });
    } catch (err) {
        return res.status(400).json({ message: 'User not updated.' });
    }
});

userAPI.delete('/:id', async (req: Request, res: Response) => {
    try {
        await deleteUser(Number(req.params.id));
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        return res.status(400).json({ message: 'Error deleting user.' });
    }
});

module.exports = userAPI;
