import express from "express";
import {
    getUsers,
    getUserById,
    postUser,
    patchUser,
    putUser,
    deleteUser
} from "../controllers/controllers.js";

import {loginUser} from "../controllers/login.js";
import {getUser} from "../controllers/getUser.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get('/profile', auth , getUser);
router.get('/', auth, getUsers);
router.get('/:id', getUserById);
router.post('/', postUser);
router.patch('/:id',auth, patchUser);
router.put('/:id', putUser);
router.delete('/:id', auth, deleteUser);
router.post('/login', loginUser);


export default router;