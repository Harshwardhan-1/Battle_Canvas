import Router from 'express';
const addUserRoutes=Router();

import { addUser,oldUser } from '../Controllers/userControllers';

addUserRoutes.post('/addUser',addUser);
addUserRoutes.post('/oldUser',oldUser);
export default addUserRoutes; 