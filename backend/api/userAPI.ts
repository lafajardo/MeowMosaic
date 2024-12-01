import { Response, Request } from 'express';

import { createUser, getUserByID, updateUser, deleteUser, getUserPosts } from 'service/userService';

interface AuthenticatedRequest extends Request {
    isAuthenticated: () => boolean;
    logout: (callback?: (err?: any) => void) => void;
}

const userAPI = express.Router();

userAPI.post('/login', passport.authenticate("local"));

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

userAPI.get('/:id', async (req: Request, res: Response) => {
    try {
        const subject = await getUserByID(Number(req.params.id));
        res.status(200).json({
            message: 'User found.',
            user: { id: subject.id, username: subject.username, email: subject.email },
        });
    } catch (err) {
        return res.status(404).json({ message: 'User not found.' });
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
        res.status(200).json({ message: 'Logout successful.' });
    });
});

app.get('/authenticated', (req: AuthenticatedRequest, res: Response) => {
    if (req.isAuthenticated()) {
        res.send('You are authenticated!');
    } else {
        res.status(401).send('You need to log in first.');
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
