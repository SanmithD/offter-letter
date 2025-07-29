import express from 'express';
import { applyView, getNotification, notify } from '../controllers/notification.controller.js';
import { authorized } from '../middleware/auth.middleware.js';

const notificationRouter = express.Router();

notificationRouter.get('/inform/:jobId', authorized, notify);
notificationRouter.get('/get', authorized, getNotification);
notificationRouter.get('/response', authorized, applyView);

export default notificationRouter;