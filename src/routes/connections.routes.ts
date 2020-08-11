import { Router } from 'express';
import ConnectionsController from '../controllers/ConnectionsController';


export const connectionsRoutes = Router();

const connectionsController = new ConnectionsController();

connectionsRoutes.route('/')
    .get(connectionsController.index)
    .post(connectionsController.create);