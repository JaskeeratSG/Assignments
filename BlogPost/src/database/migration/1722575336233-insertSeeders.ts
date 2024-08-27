import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertSeeders1722575336233 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

         await queryRunner.query(`INSERT INTO "User" (username, password) VALUES ('Admin', 'newAdmin');`)

         await queryRunner.query(`INSERT INTO "Permission" (type) VALUES ('READ'), ('WRITE'), ('BOTH');`)
         
         await queryRunner.query(`INSERT INTO "UserPermission" ("userId", "permissionId")
              VALUES (
              (SELECT id FROM "User" WHERE username = 'Admin'),
              (SELECT id FROM "Permission" WHERE type = 'BOTH')
              );`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

            await queryRunner.query(`DELETE FROM "UserPermission" WHERE "userId" = (SELECT id FROM "User" WHERE username = 'Aman') AND "permissionId" = (SELECT id FROM "Permission" WHERE type = 'BOTH');`);
            
            await queryRunner.query(`DELETE FROM "Permission" WHERE type IN ('READ', 'WRITE', 'BOTH');`);
            
            await queryRunner.query(`DELETE FROM "User" WHERE username = 'Admin';`);
        
    
    }

}