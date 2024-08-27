import { Application } from "express";
import { AuthenticateRequest } from "../../middleware/autheticate-request";
import blogRoutes from './blog.route';
import userRoutes from './user.route'


export class Routes {
  private authenticate;
  constructor() {
    const authMiddleware = new AuthenticateRequest();
    this.authenticate = authMiddleware.validate;
  }
  public routes(app: Application): void {
    app.use("/blog", blogRoutes);
    app.use('/user',userRoutes);
  }
}
