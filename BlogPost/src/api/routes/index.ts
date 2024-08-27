import express from "express";
import blogRoutes from './blog.routes';
import bodyParser from 'body-parser';
import userRoutes from './user-routes'

const app = express();


app.use(bodyParser.json());
app.use('/blog',blogRoutes);
app.use('/user',userRoutes);


export default app;






// app.use('/blog', blogRoutes);
// app.use('/user', userroutes);
