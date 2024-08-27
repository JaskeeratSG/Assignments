import {AppDataSource} from '../../database/data-source'
import {User} from '../../database/model/user'
import { UserPermission } from '../../database/model/user-permission';

import { Permission } from '../../database/model/permission'; 

const AddUsers = async (req: any, res: any) => {
  const id = req.params.id;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: id });

  if(user?.username!=='Admin' || !user)  {
    res.status(200).json({message:"sorry you are not an admin"})
    return;
  }
  const userPermissionRepo = AppDataSource.getRepository(UserPermission);
  const permissionRepository = AppDataSource.getRepository(Permission); 

  const { username, password, permissionId } = req.body;
  const newUser = new User();
  newUser.username = username;
  newUser.password = password;

  try {
    const user = await userRepository.save(newUser);

    const permission = await permissionRepository.findOneBy({ id: permissionId });
    if (!permission) {
      return res.status(400).json({ message: "Permission not found" });
    }

    const newPermission = new UserPermission();
    newPermission.user = user;
    newPermission.permission = permission;
    
    console.log(newPermission);
    
    await userPermissionRepo.save(newPermission);

    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    console.log("error in user controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const RemoveUser = async (req:any, res:any)=>{
    const id = req.params.id;
    const userRepository = AppDataSource.getRepository(User);

    try{
         await userRepository.delete(id);
         res.status(200).json({message:"user deleted successfully"});
    }
    catch(error)
    {
      console.log("error in user controller delete", error);
      res.status(404).json({message:"bad request"});
    }
}


export {AddUsers,RemoveUser};