import "reflect-metadata";
import { DataSource } from "typeorm";
import { Blog } from "./model/blog";
import {User} from "./model/user"
import { UserPermission } from "./model/user-permission";
import { PermissionType } from "./model/permission";
import { Permission } from "./model/permission";

import   {TYPEORM_HOST,
TYPEORM_USERNAME,
TYPEORM_PASSWORD,
TYPEORM_DATABASE,
TYPEORM_PORT,
TYPEORM_LOGGING,
 } from "../../config/secret" 

export const AppDataSource = new DataSource({
  type: "postgres",
  host: TYPEORM_HOST,
  port: parseInt(TYPEORM_PORT),
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database:TYPEORM_DATABASE,
  entities: [Blog,User, UserPermission, Permission],
  synchronize: false,
  migrations: ['src/database/migration/**/*.ts'],
  logging: Boolean(TYPEORM_LOGGING),
})

console.log(TYPEORM_PORT)

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
