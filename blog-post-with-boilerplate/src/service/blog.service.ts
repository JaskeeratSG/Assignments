import { AppDataSource } from "@database/db-connection";
import { Blog } from "@database/model/blog";
import { User } from "@database/model/user";
import { UserPermission } from "@database/model/user-permission";
import { number } from "joi";
import { Repository } from "typeorm";

export class BlogService {
    private blogRepository: Repository<Blog>;
    private userRepository: Repository<User>;
    private permissionRepository: Repository<UserPermission>;

    constructor() {
        this.blogRepository = AppDataSource.getRepository(Blog);
        this.userRepository = AppDataSource.getRepository(User);
        this.permissionRepository = AppDataSource.getRepository(UserPermission);
    }

    public async addPost(title: string, content: string, authorId: number): Promise<Blog> {
        const user = await this.userRepository.findOne({ where: { id: authorId } });
        const permission = await this.permissionRepository.findOne({
            where: { userId : authorId, permissionId: 14 }
        });

        if (!permission) {
            throw new Error("You are not allowed to write a blog");
        }

        const newBlog = new Blog();
        newBlog.title = title;
        newBlog.content = content;
        newBlog.author = user as User;

        return this.blogRepository.save(newBlog);
    }

    public async getPosts(): Promise<Blog[]> {
        return this.blogRepository.find();
    }

    public async editPost(id: number, title: string, content: string): Promise<Blog> {
        const blog = await this.blogRepository.findOne({ where: { id } });

        if (!blog) {
            throw new Error("Blog not found");
        }

        blog.title = title;
        blog.content = content;

        return this.blogRepository.save(blog);
    }

    public async removePost(id: number): Promise<void> {
        await this.blogRepository.delete(id);
    }
}
