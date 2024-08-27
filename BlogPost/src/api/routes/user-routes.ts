import express from 'express';
import { AddUsers, RemoveUser } from '../controller/user-controller';

const router = express.Router();


router.post('/:id',AddUsers);
router.delete(':/id',RemoveUser);

export default router;