import { MigrationInterface, QueryRunner } from "typeorm";

import { Permission } from "@database/model/permission";
import { User } from "@database/model/user";
import { UserPermission} from "@database/model/user-permission";
import { PermissionType } from "@database/model/permission";

export class SeedTable1723449590544 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.manager.getRepository(User);
        const adminUser = userRepository.create({ username: 'Admin', password: 'newAdmin' });
        await userRepository.save(adminUser);

        const permissionRepository = queryRunner.manager.getRepository(Permission);
        const readPermission = permissionRepository.create({ type : PermissionType.READ });
        const writePermission = permissionRepository.create({ type: PermissionType.WRITE });
        const bothPermission = permissionRepository.create({ type: PermissionType.BOTH});
        await permissionRepository.save([readPermission, writePermission, bothPermission]);

        const userPermissionRepository = queryRunner.manager.getRepository(UserPermission);
        const userPermission = userPermissionRepository.create({
            userId: adminUser.id,
            permissionId: bothPermission.id
        });
        await userPermissionRepository.save(userPermission);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.manager.getRepository(User);
        const permissionRepository = queryRunner.manager.getRepository(Permission);
        const userPermissionRepository = queryRunner.manager.getRepository(UserPermission);

        const adminUser = await userRepository.findOne({ where: { username: 'Admin' } });
        const bothPermission = await permissionRepository.findOne({ where: { type: PermissionType.BOTH } });

        if (adminUser && bothPermission) {
            await userPermissionRepository.delete({
                userId: adminUser.id,
                permissionId: bothPermission.id
            });

            await userRepository.delete(adminUser.id);
        }
    }

}
