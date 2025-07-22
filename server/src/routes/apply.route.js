import express from 'express';
import { applyToJob, getAppliedJobs, getAppliedUser } from '../controllers/apply.controller.js';
import { authorized } from '../middleware/auth.middleware.js';

const applyRouter = express.Router();

applyRouter.post("/:jobId", authorized, applyToJob);
applyRouter.get("/applications", authorized, getAppliedJobs);
applyRouter.get("/userDetails/:id", authorized, getAppliedUser);

export default applyRouter;