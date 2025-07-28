import express from 'express';
import { applyView, getNotification } from '../controllers/notification.controller.js';
import { authorized } from '../middleware/auth.middleware.js';

const notificationRouter = express.Router();

notificationRouter.get('/inform', authorized, applyView);
notificationRouter.get('/get', authorized, getNotification);

export default notificationRouter;