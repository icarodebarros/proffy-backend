import { Router } from 'express';
import ClassesController from '../controllers/ClassesController';


export const classesRoutes = Router();

const classesController = new ClassesController();

classesRoutes.route('/')
    .get(classesController.index)
    .post(classesController.create);