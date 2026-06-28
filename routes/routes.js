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
import {adminOnly} from "../middlewares/adminOnly.js";

const router = express.Router();

router.get('/', auth, getUsers);
router.get('/:id', getUserById);
router.get('/profile', auth , getUser);

router.post('/', postUser);

router.patch('/:id',auth, patchUser);
router.put('/:id', putUser);

router.delete('/:id', auth, adminOnly, deleteUser);



export default router;