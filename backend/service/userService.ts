import { User } from '@prisma/client';

import { CreateUser } from '@shared/types/createUser';
import { UpdateUser } from '@shared/types/updateUser';

const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;

export const createUser = async (newUser: CreateUser) => {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    return await prisma.user.create({
        data: {
            username: newUser.username,
            email: newUser.email,
            password: hashedPassword,
        },
    })
}

export const getUserByID = async (userID: number) => {
    return await prisma.user.findUnique({
        where: {
            id: userID,
        },
    });
}

export const getUserPosts = async (userID: number) => {
    return await prisma.user.findUnique({
        where: {
            id: userID,
        },
        include: {
            posts: true,
        }
    });
}

export const updateUser = async (userID: number, newUser: UpdateUser) => {
    return await prisma.user.update({
        where: {
            id: userID,
        },
        data: {
            ...(newUser.username && { username: newUser.username }),
            ...(newUser.email && { email: newUser.email }),
            ...(newUser.password && { password: await bcrypt.hash(newUser.password, 10) }),
        },
    });
}

export const deleteUser = async (userID: number) => {
    return await prisma.user.delete({
        where: {
            id: userID,
        },
    });
}

passport.use(
    new LocalStrategy(async (username: string, password: string, done: CallableFunction) => {
        try {
            const subject = await prisma.user.findUnique({
                where: {
                    username: username,
                }
            });
            if (!subject) {
                return done(null, false, { message: "Incorrect username" });
            }
            if (!(await bcrypt.compare(password, subject.password))) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, subject);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user: User, done: CallableFunction) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done: CallableFunction) => {
    try {
        const subject = await prisma.user.findUnique({
            where: {
                id: id,
            }
        });
        done(null, subject);
    } catch (err) {
        done(err);
    }
});
