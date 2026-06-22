import express from "express";
import {
    getUsers,
    getUserById,
    postUser,
    patchUser,
    putUser,
    deleteUser
} from "../controllers/controllers.js";

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', postUser);
router.patch('/:id', patchUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

export default router;