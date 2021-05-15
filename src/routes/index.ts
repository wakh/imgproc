import { Router as rt } from 'express';
import images from './api/images';

const routes = rt();

routes.get('/', (req, res) => {
  res.send('Main API route');
});

routes.use('/images', images);

export default routes;
