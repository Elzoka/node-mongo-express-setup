import { Router } from 'express';
import apiRoutes from './api';

const routes = Router();

routes.get('/ping', (req, res, next) => {
  res.send('pong');
});

routes.use('/api', apiRoutes);

export default routes;
