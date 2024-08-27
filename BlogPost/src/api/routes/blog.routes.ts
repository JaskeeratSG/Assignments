import { Router } from 'express';
import { AppDataSource } from '../../database/data-source';
import { Blog } from '../../database/model/blog';
import {createPosts, getPosts, deletePosts} from '../controller/blog-controller'
const router = Router();

router.post('/',createPosts);

router.get('/', getPosts);

router.delete('/:id', deletePosts);


export default router;