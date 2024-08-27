import "reflect-metadata";
import { DataSource } from "typeorm";
import { Blog } from "./model/blog";
import {User} from "./model/user"
import { UserPermission } from "./model/user-permission";
import { PermissionType } from "./model/permission";
import { Permission } from "./model/permission";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5000,
  username: "postgres",
  password: "Mummypapa10@",
  database: "blogpost",
  entities: [Blog,User, UserPermission, Permission],
  synchronize: false,
  migrations: ['src/database/migration/**/*.ts'],
  logging: false,
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
