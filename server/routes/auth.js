import express from 'express';
import {register, login} from './../controllers/AuthController';
import { body } from 'express-validator';

const router = express.Router();

router.post('/register', 
    body('name').not().isEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 64 }),
    register
);

router.post('/login',
    body('email').isEmail(),
    body('password').not().isEmpty(),
    login
);

module.exports = router;