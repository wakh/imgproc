import express, { Router as rt } from 'express';
import images from './api/images';

const routes = rt();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Main API route');
});

routes.use('/images', images);

export default routes;
