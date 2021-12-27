import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModels.js';

const userRouter = express.Router();
userRouter.get('/seed',expressAsyncHandler(async (req, res) => {
    await User.deleteMany({});
    const definedUsers = await User.insertMany(data.users);
    res.send(definedUsers);
}));

export default userRouter;