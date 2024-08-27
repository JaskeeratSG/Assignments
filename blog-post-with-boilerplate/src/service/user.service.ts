import { AppDataSource } from "@database/db-connection";
import { User } from "@database/model/user";
import { UserPermission } from "@database/model/user-permission";
import { Permission } from "@database/model/permission";
import { BasicUserDetailResponse } from "@type/user";

export class UserServices {
    private userRepository;
    private permissionRepository;
    private userPermissionRepo;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.permissionRepository = AppDataSource.getRepository(Permission);
        this.userPermissionRepo = AppDataSource.getRepository(UserPermission);
    }

    public async addUser(username: string, password: string, permissionId: number): Promise<BasicUserDetailResponse> {
        const newUser = new User();
        newUser.username = username;
        newUser.password = password;

        try {
            const user = await this.userRepository.save(newUser);

            const permission = await this.permissionRepository.findOneBy({ id: permissionId });
            if (!permission) {
                throw new Error("Permission not found");
            }

            const newPermission = new UserPermission();
            newPermission.user = user;
            newPermission.permission = permission;

            await this.userPermissionRepo.save(newPermission);

            return { id: user.id, username: user.username };
        } catch (error) {
            console.error("Error in UserServices.addUser:", error);
            throw error;
        }
    }

    public async removeUser(id: number): Promise<void> {
        try {
            await this.userRepository.delete(id);
        } catch (error) {
            console.error("Error in UserServices.removeUser:", error);
            throw error;
        }
    }

    public async isAdmin(userId: number): Promise<boolean> {
        const user = await this.userRepository.findOneBy({ id: userId });
        return user?.username === 'Admin';
    }
}
