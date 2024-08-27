import { MigrationInterface, QueryRunner, Table ,TableForeignKey} from "typeorm";

export class CreateTable1722511776688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(new Table({
          name: 'User',
          columns: [
            { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'username', type: 'varchar', length: '255' },
            {name:'isloggedIn', type:'boolean'},
            { name: 'password', type: 'varchar', length: '255' },
          ],
        }));
    
        await queryRunner.createTable(new Table({
          name: 'Blog',
          columns: [
            { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'title', type: 'varchar', length: '255' },
            { name: 'content', type: 'text' },
            { name: 'authorId', type: 'int' }, 
            { name: 'createdAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
            { name: 'updatedAt', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          ],
        }));
    
    
        await queryRunner.createTable(new Table({
          name: 'Permission',
          columns: [
            { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'type', type: 'enum', enum: ['READ', 'WRITE', 'BOTH'] },
          ],
        }));
    
       
        await queryRunner.createTable(new Table({
          name: 'UserPermission',
          columns: [
            { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
            { name: 'userId', type: 'int' }, 
            { name: 'permissionId', type: 'int' },
          ],
        }));

        await queryRunner.createForeignKey('Blog', new TableForeignKey({
          columnNames: ['authorId'],
          referencedTableName: 'User',
          referencedColumnNames: ['id'],
        }));
    
        await queryRunner.createForeignKey('UserPermission', new TableForeignKey({
          columnNames: ['userId'],
          referencedTableName: 'User',
          referencedColumnNames: ['id'],
        }));
    
        await queryRunner.createForeignKey('UserPermission', new TableForeignKey({
          columnNames: ['permissionId'],
          referencedTableName: 'Permission',
          referencedColumnNames: ['id'],
        }));
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey('UserPermission', 'FK_UserPermission_User');
        await queryRunner.dropForeignKey('UserPermission', 'FK_UserPermission_Permission');
        await queryRunner.dropForeignKey('Blog', 'FK_Blog_User');
    

        await queryRunner.dropTable('UserPermission');
        await queryRunner.dropTable('Permission');
        await queryRunner.dropTable('Blog');
        await queryRunner.dropTable('User');
      }

}
