import "reflect-metadata";
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './database/data-source';
import app from './api/routes/index'

const PORT = 3000;




AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => console.log(error));
