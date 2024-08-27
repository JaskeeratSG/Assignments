import {AppDataSource} from '../../database/data-source'
import { Blog } from '../../database/model/blog';
import { User } from '../../database/model/user';
import { UserPermission } from '../../database/model/user-permission';

const createPosts =  async (req:any, res:any) => {
    const {title, content, authorId } = req.body;
    const blogRepository = AppDataSource.getRepository(Blog);
    const userRepository = AppDataSource.getRepository(User);
    const permissionRepository = AppDataSource.getRepository(UserPermission)

    const user = await userRepository.findOne({ where: { id: authorId }  });
    
   console.log(user);
   
    const findPermission = await permissionRepository.findOne({
      where:{
        userId: authorId,
        permissionId:14
      }
    })

    console.log(findPermission);
    if(!findPermission)
    {
        res.status(400).json({message : "you are not allowed to write a blog"});
        return;
    }
  
    

    const newBlog = new Blog();
    newBlog.title = title;
    newBlog.content = content;
    newBlog.author = user as User;
    try{
      await blogRepository.save(newBlog);
      res.status(201).send(newBlog);
    }
    catch(error)
    {
      console.log(error);
      res.status(400).json("unable to create post");
    }
}

const getPosts = async (req:any, res:any) => {
    const blogRepository = AppDataSource.getRepository(Blog);
    const blogs = await blogRepository.find();
    res.status(200).send(blogs);
  }


const deletePosts= async(req:any,res:any)=>{
    const id = req.params.id;
    const blogRepository = AppDataSource.getRepository(Blog);
    try{
      await blogRepository.delete(id);
      res.status(200).json({message:"query deleted successfully"})
    }
    catch(error)
    {
      console.log(error);
      res.status(404).json({message:"unable to delete blog"});
    }
  }

  export {createPosts, getPosts, deletePosts};