import express from 'express';
import { postJob, removeJob } from '../controllers/job.controller.js';
import { authorized } from '../middleware/auth.middleware.js';

const jobRouter = express.Router();

jobRouter.post('/postJob', authorized, postJob);
jobRouter.delete('/remove/:id', authorized, removeJob);

export default jobRouter;