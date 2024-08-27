// blog-controller.ts
import { Request, Response } from 'express';
import { BlogService } from '../../service/blog.service';
import { ResponseParser } from '../../util/response-parser';

const blogService = new BlogService();

const createPosts = async (req: Request, res: Response) => {
    const { title, content, authorId } = req.body;

    try {
        const newBlog = await blogService.addPost(title, content, authorId);
        ResponseParser.parseAndSend(201, true, "Blog post created successfully", "SUC20101", { blog: newBlog }, res);
    } catch (error) {
        console.error("Error in createPosts:", error);
        ResponseParser.parseAndSend(400, false, error.message || "Unable to create post", "ERR40001", {}, res);
    }
};

const getPosts = async (req: Request, res: Response) => {
    try {
        const blogs = await blogService.getPosts();
        ResponseParser.parseAndSend(200, true, "Blogs fetched successfully", "SUC20001", { blogs }, res);
    } catch (error) {
        console.error("Error in getPosts:", error);
        ResponseParser.parseAndSend(500, false, "Internal server error", "ERR50001", {}, res);
    }
};

const deletePosts = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    try {
        await blogService.removePost(id);
        ResponseParser.parseAndSend(200, true, "Blog deleted successfully", "SUC20002", {}, res);
    } catch (error) {
        console.error("Error in deletePosts:", error);
        ResponseParser.parseAndSend(404, false, "Unable to delete blog", "ERR40401", {}, res);
    }
};

export { createPosts, getPosts, deletePosts };
