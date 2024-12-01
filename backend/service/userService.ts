import { User } from "../models"; 

const bcrypt = require('bcrypt')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const createUser = async (newUser: User) => {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    return await prisma.user.create({
        data: {
            username: newUser.username, 
            email: newUser.email,
            password: hashedPassword,
        },
    })
}

const getUserByID = async (userID: number) => {
    return await prisma.user.findUnique({
        where: {
            id: userID,
        },
    });
}

const updateUser = async (userID: number, newUser: User) => {
    return await prisma.user.update({
        where: {
            id: userID,
        },
        data: {
            username: newUser.username, 
            email: newUser.email,
            password: await bcrypt.hash(newUser.password, 10),
        },
    });
}

const deleteUser = async (userID: number) => {
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
