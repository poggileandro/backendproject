import { Router } from 'express';

import mockscontroller from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mokingusers',mockscontroller.getUsers);

router.post('/generateData', mockscontroller.createData);

router.get('/generateData',mockscontroller.getData)

export default router;
