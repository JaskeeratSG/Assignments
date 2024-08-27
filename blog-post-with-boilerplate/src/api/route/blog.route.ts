import { Router } from 'express';
import {createPosts, getPosts, deletePosts} from '../controller/blog.controller'
const router = Router();

router.post('/',createPosts);

router.get('/', getPosts);

router.delete('/:id', deletePosts);


export default router;